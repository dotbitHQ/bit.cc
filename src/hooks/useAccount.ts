import { Ref, ref } from '@nuxtjs/composition-api'
import DasSDK, { AccountData, AccountRecord, AccountRecordType, AccountRecordTypes } from 'das-sdk'
import { DasRecordType } from '~/constant/das'
import { ResolveResult } from '~/modules/das'
import { das } from '~/services'

export enum AccountStatus {
  loading,
  unregistered,
  failed,
  successful,
}

declare module 'das-sdk' {
  interface AccountRecord {
    name: string,
  }
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

  addresses: [] as AccountRecord[],
  profiles: [] as AccountRecord[],
  customs: [] as AccountRecord[],
}

export type AccountInfo = typeof defaultAccount

export function useAccount (resolveResult: ResolveResult): {account: Ref<AccountInfo>, fetchAccount: Function} {
  const account = ref({
    ...defaultAccount,
    account: resolveResult.account,
  })

  async function fetchAccount (): Promise<void> {
    let accountData: AccountInfo
    let rawRecords: AccountRecord[]

    try {
      accountData = await das.account(account.value.account)
      rawRecords = await das.records(account.value.account)
    }
    catch (err) {
      // @ts-ignore
      if (err.code === 'UnregisteredDomain') {
        account.value.status = AccountStatus.unregistered
      }
      else {
        account.value.status = AccountStatus.failed
        console.error(err)
      }

      return
    }

    const records: AccountRecord[] = rawRecords.map(record => {
      const keyParts = record.key.split('.') // address.btc

      return {
        ...record,
        type: keyParts.shift() as AccountRecordType, // address
        name: keyParts.join('.'), // btc
      }
    })

    const addresses = records.filter(record => {
      if (record.type === DasRecordType.address) {
        // crypto name should be all uppercase, btc => BTC
        record.name = record.name.toUpperCase()
        return true
      }
      return false
    })

    const profiles = records.filter(record => {
      if (record.type === DasRecordType.profile) {
        // First letter should be uppercase, youtube => Youtube
        record.name = record.name.charAt(0).toUpperCase() + record.name.slice(1)
        return true
      }
      return false
    })

    let customs = records.filter(record => record.type === AccountRecordTypes.custom)
    const descriptionRecord = profiles.find(record => record.key === 'profile.description')
    const avatarRecord = profiles.find(record => record.key === 'profile.avatar')
    const welcomeRecord = customs.find(record => record.key === 'custom_key.bitcc_welcome')
    const themeRecord = customs.find(record => record.key === 'custom_key.bitcc_theme')
    const redirectRecord = customs.find(record => record.key === 'custom_key.bitcc_redirect')
    const backgroundImageRecord = customs.find(record => record.key === 'custom_key.bitcc_background_image')

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

      // @ts-ignore
      owner_address_chain: algorithm2Chain[accountData.owner_algorithm_id] || 'eth',
      // @ts-ignore
      manager_address_chain: algorithm2Chain[accountData.manager_algorithm_id] || 'eth',

      description: descriptionRecord?.value || '',
      avatar: avatarRecord?.value || '',
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
