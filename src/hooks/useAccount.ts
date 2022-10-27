import { Ref, ref } from '@nuxtjs/composition-api'
import { ResolveResult } from '~/modules/das'
import { dotbit } from '~/services'
import {
  AccountInfo,
  BitAccountRecord,
  BitAccountRecordAddress,
  BitAccountRecordExtended
} from 'dotbit/lib/fetchers/BitIndexer.type'
import { RecordType } from 'dotbit'

export enum AccountStatus {
  loading,
  unregistered,
  failed,
  successful,
  onCross
}

const defaultAccount = {
  status: AccountStatus.loading as AccountStatus,

  account: '',

  owner_algorithm_id: 3,
  manager_algorithm_id: 3,
  owner_key: '',
  manager_key: '',

  owner_address: '',
  manager_address: '',
  owner_address_chain: '',
  manager_address_chain: '',

  description: '',
  avatar: '',
  welcome: '',
  theme: '',
  backgroundImage: '',
  redirect: '',

  addresses: [] as BitAccountRecordAddress[],
  profiles: [] as BitAccountRecordExtended[],
  customs: [] as BitAccountRecord[],
}

export type AccountInfoExtended = typeof defaultAccount

export function useAccount (resolveResult: ResolveResult): {account: Ref<AccountInfoExtended>, fetchAccount: Function} {
  const account = ref({
    ...defaultAccount,
    account: resolveResult.account,
  })

  async function fetchAccount (): Promise<void> {
    let accountData: AccountInfo
    let rawRecords: BitAccountRecordExtended[]

    try {
      accountData = await dotbit.accountInfo(account.value.account)
      rawRecords = await dotbit.records(account.value.account)
    }
    catch (err) {
      // @ts-expect-error
      if (err.code === 20007) {
        account.value.status = AccountStatus.unregistered
      }
      // @ts-expect-error
      else if (err.code === 20008) {
        account.value.status = AccountStatus.onCross
      }
      else {
        account.value.status = AccountStatus.failed
        console.error(err)
      }

      return
    }

    const addresses = rawRecords.filter(record => {
      if (record.type === RecordType.address) {
        // crypto name should be all uppercase, btc => BTC
        record.subtype = record.subtype.toUpperCase()
        return true
      }
      return false
    })

    const profiles = rawRecords.filter(record => {
      if (record.type === RecordType.profile) {
        // First letter should be uppercase, youtube => Youtube
        record.subtype = record.subtype.charAt(0).toUpperCase() + record.subtype.slice(1)
        return true
      }
      return false
    })

    let customs = rawRecords.filter(record => record.type === RecordType.custom)
    const descriptionRecord = profiles.find(record => record.key === 'profile.description')
    const welcomeRecord = customs.find(record => record.key === 'custom_key.bitcc_welcome')
    const themeRecord = customs.find(record => record.key === 'custom_key.bitcc_theme')
    const redirectRecord = customs.find(record => record.key === 'custom_key.bitcc_redirect')
    const backgroundImageRecord = customs.find(record => record.key === 'custom_key.bitcc_background_image')

    // const avatar = await dotbit.avatar(account.value.account)
    const avatar = profiles.find(record => record.key === 'profile.avatar')
    customs = customs.filter(record => record.key.indexOf('custom_key.bitcc_') !== 0)

    const algorithm2Chain = {
      3: 'eth',
      4: 'tron',
      5: 'eth',
    }

    Object.assign(account.value, {
      status: AccountStatus.successful,

      owner_address: accountData.owner_key,
      manager_address: accountData.manager_key,

      // @ts-expect-error
      owner_address_chain: algorithm2Chain[accountData.owner_algorithm_id] || 'eth',
      // @ts-expect-error
      manager_address_chain: algorithm2Chain[accountData.manager_algorithm_id] || 'eth',

      description: descriptionRecord?.value || '',
      avatar: avatar?.value || '',
      welcome: welcomeRecord?.value || '',
      theme: themeRecord?.value || '',
      backgroundImage: backgroundImageRecord?.value || '',
      redirect: redirectRecord?.value || '',

      addresses,
      profiles,
      customs,
    })
  }

  return {
    account,
    fetchAccount,
  }
}
