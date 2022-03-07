# bit.cc

English | [简体中文](./README_CN.md)

[bit.cc](https://bit.cc) is a service to display your personalized [.bit](https://did.id) account.

bit.cc will read .bit records stored on chain. As users change their records, bit.cc will show different appearance. 

If you want to share your media contact, blockchain address and other personalized info to others, don't hesitate to set your .bit records and share the corresponding bit.cc url.

## Usage

### Set Records
All records added on .bit will be displayed on bit.cc.

If you don't know how to add .bit records, please checkout the link below.

[Manage .bit records](https://dasystems.medium.com/das-is-now-listed-on-imtoken-619b1052b788)

### Visit a url
If the record is a web url, or the record itself can jump to a web page, you can jump directly to the corresponding link.

![Visit a url](./docs/visit.png)

### Change bit.cc appearance
Aside from displaying .bit records, bit.cc's appearance can be changed by changing .bit records.

#### Configure description
You can change the description field on bit.cc by setting `description` field under `profile`.
![Configure description](./docs/set_description.png)

#### Configure avatar
You can change the avatar image on bit.cc by setting `avatar` field under `profile`.
![Configure avatar](./docs/set_avatar.png)

#### ~~Configure welcome~~
> The welcome field is no longer in use.

You can change the welcome message on bit.cc by setting custom records.

Please fill in the custom key with `bitcc_welcome`, and value with any message you want.

![Configure welcome](./docs/set_welcome.png)

#### Configure theme
You can change the theme of bit.cc by setting custom records.

Please fill in the custom key with `bitcc_theme`. The value can either be `light` or `dark`, corresponding to light and on, respectively.

![Configure theme](./docs/theme_dark.png)

#### Configure redirect
You can use bit.cc as an entry to your other website. When users enter your bit.cc, they will be redirected to your own website.

Please fill in the custom key with `bitcc_redirect`. The value can be any website url you want.

![Configure redirect](./docs/set_redirect.png)

## Share Link
Once the .bit records has been set up, you can share your customized bit.cc pages to any others. 

The format of the link is as follows: 

> [yourname].bit.cc

For example, if your .bit account is `dastodamoon.bit`, the link will be [https://dastodamoon.bit.cc](https://dastodamoon.bit.cc)

