import type { LegalContent } from './types';

const content: LegalContent = {
  privacy: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'introduction',
        title: '简介',
        body: (
          <>
            <p>
              本政策说明由 <strong>{c.developer}</strong>（“我们”）开发的 <strong>{c.appName}</strong> 应用及本网站如何处理您的数据。
            </p>
            <p>隐私联系方式：{c.email}{c.site.developer.address && <> · 地址：{c.site.developer.address}</>}</p>
          </>
        ),
      },
      {
        id: 'summary',
        title: '概要',
        body: (
          <ul>
            <li>您无需登录即可使用应用。此时学习数据只保存在您的设备上。</li>
            <li>如果您使用 Google 或 Apple 登录，我们会在服务器上保存一个账户（标识符、显示名称、邮箱）。</li>
            {(s.admob || s.firebaseAnalytics) && (
              <li>
                应用使用了 {[s.admob && 'Google AdMob（广告）', s.firebaseAnalytics && 'Firebase Analytics（使用统计）'].filter(Boolean).join('和')}。这些 Google 服务会按下文所述收集设备数据。
              </li>
            )}
            {s.youtube && <li>视频通过 YouTube 播放器播放。</li>}
            <li>我们不会出售您的个人数据。</li>
            <li>您可以随时删除账户：{c.deleteLink('删除账户')}。</li>
          </ul>
        ),
      },
      {
        id: 'on-device',
        title: '保存在您设备上的数据',
        body: (
          <>
            <p>应用会在设备存储中保存以下数据：</p>
            <ul>
              <li>收藏的视频和播放列表、观看记录，以及每个视频的笔记。</li>
              <li>学习进度、保存的单词、练习结果和经验值（XP）。</li>
              <li>口语练习录音：仅在您使用录音功能时产生（需要麦克风权限）。录音不会上传。</li>
              <li>界面语言等设置。</li>
              <li>登录令牌（如果您已登录），保存在操作系统的安全存储（Keychain/Keystore）中。</li>
            </ul>
            {s.cloudSync ? (
              <p>登录后，收藏、观看记录、笔记和学习进度会同步到我们的服务器，以便在多台设备上使用。</p>
            ) : (
              <p>目前应用<strong>不会</strong>将这些学习数据发送到我们的服务器，即使您已登录。如果将来增加同步功能，我们会先更新本政策。</p>
            )}
            <p>您可以在应用中删除这些数据（设置 → 账户 → 删除本机学习数据，或删除账户），也可以卸载应用。</p>
          </>
        ),
      },
      {
        id: 'account',
        title: '登录时的账户数据',
        body: (
          <>
            <p>
              登录是可选的，可使用 {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' 或 ')}。我们从登录服务提供方获得您的账户标识符、邮箱地址（如您选择“隐藏邮件地址”，Apple 可能提供中转邮箱）以及提供方附带的姓名。我们永远不会获得您的密码。
            </p>
            <p>我们在服务器上保存：</p>
            <ul>
              <li>账户资料：内部用户 ID、显示名称、经提供方验证的邮箱、创建时间和最近活动时间。</li>
              <li>登录关联：提供方（Google/Apple）、您在该提供方的账户标识符、邮箱。</li>
              <li>登录会话：平台（Android/iOS）、应用版本、创建时间、最近使用时间和到期时间。会话刷新令牌仅以哈希形式保存。</li>
            </ul>
            <p>目的：识别您的身份、保持登录状态、保护账户安全以及处理账户删除。</p>
          </>
        ),
      },
      {
        id: 'server',
        title: '应用连接服务器时的技术数据',
        body: (
          <>
            <p>
              我们的 API 服务器运行在 Cloudflare 上。应用发出的每个请求（例如加载视频列表、登录）都包含您的 IP 地址、时间和请求信息。我们用这些数据来限制请求频率、防止滥用和记录错误。技术日志最多保存{' '}
              {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} 天。
            </p>
            {s.youtube && <p>为获取视频列表，我们的服务器会调用 YouTube Data API。此步骤不会向 YouTube 发送您的任何个人数据。</p>}
          </>
        ),
      },
      {
        id: 'third-parties',
        title: '第三方服务',
        body: (
          <>
            <p>以下服务在应用中运行，并按其各自的政策处理数据：</p>
            <ul>
              {s.youtube && (
                <li>
                  <strong>YouTube（Google）</strong>：视频通过 YouTube 嵌入式播放器播放。观看时，YouTube 可能收集您的 IP 地址、设备信息和观看活动，并使用 Cookie 或类似标识符。参见{' '}
                  {c.ext('https://www.youtube.com/t/terms', 'YouTube 服务条款')}和{c.ext('https://policies.google.com/privacy', 'Google 隐私权政策')}。
                </li>
              )}
              {s.admob && (
                <li>
                  <strong>Google AdMob</strong>：展示广告。可能收集设备广告 ID（Android 广告 ID；在 iOS 上经您允许后的 IDFA）、IP 地址、设备和系统信息、根据 IP 推断的大致位置以及广告互动。在欧洲经济区、英国和瑞士，应用会在展示广告前通过 Google 的同意工具征求您的同意；在 iOS 上，应用会根据“App 跟踪透明度”请求跟踪权限。参见{' '}
                  {c.ext('https://policies.google.com/technologies/partner-sites', 'Google 如何使用来自合作伙伴应用的信息')}。
                </li>
              )}
              {s.firebaseAnalytics && (
                <li>
                  <strong>Firebase Analytics（Google）</strong>：统计应用的使用情况，包括浏览的页面、分类和菜单点击、应用实例 ID、设备型号、操作系统、应用版本、语言、国家或大致位置，并可能包括广告 ID。这些数据不与您的账户关联，最多保存{' '}
                  {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} 个月。参见{' '}
                  {c.ext('https://firebase.google.com/support/privacy', 'Firebase 中的隐私和安全')}。
                </li>
              )}
              {(s.googleSignIn || s.appleSignIn) && (
                <li>
                  <strong>使用 {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' / ')} 登录</strong>：提供方验证您的身份，并向我们发送“账户数据”中列出的信息。参见{' '}
                  {s.googleSignIn && c.ext('https://policies.google.com/privacy', 'Google')}
                  {s.googleSignIn && s.appleSignIn && ' 和 '}
                  {s.appleSignIn && c.ext('https://www.apple.com/legal/privacy/', 'Apple')}。
                </li>
              )}
              <li>
                <strong>Cloudflare</strong>：托管我们的 API 服务器和账户数据库。参见{' '}
                {c.ext('https://www.cloudflare.com/privacypolicy/', 'Cloudflare 隐私政策')}。
              </li>
              {c.site.services.resendEmail && (
                <li>
                  <strong>Resend</strong>：发送账户删除确认邮件。Resend 会收到收件人地址和邮件内容。参见{' '}
                  {c.ext('https://resend.com/legal/privacy-policy', 'Resend 隐私政策')}。
                </li>
              )}
            </ul>
          </>
        ),
      },
      {
        id: 'website',
        title: '本网站',
        body: (
          <ul>
            <li>本网站不使用广告或统计工具，只设置一个 Cookie 用于记住您选择的语言。</li>
            <li>与所有网站一样，托管服务器可能为运行和安全目的记录技术访问日志（IP 地址、时间、请求的页面）。</li>
            <li>
              当您在网页上申请删除账户时，您输入的邮箱会发送到我们的服务器，用于查找关联账户并向该邮箱发送确认链接。请求记录不保存邮箱地址，只保存其 SHA-256 哈希值。确认码仅以哈希形式保存，30 分钟后过期，且只能使用一次。
            </li>
          </ul>
        ),
      },
      {
        id: 'purposes',
        title: '数据使用目的',
        body: (
          <ul>
            <li>提供应用功能并保存您的学习数据。</li>
            <li>登录、保持会话并保护您的账户。</li>
            {s.admob && <li>展示广告以维持应用免费。</li>}
            {s.firebaseAnalytics && <li>了解应用的使用情况，以改进内容和修复问题。</li>}
            <li>防止滥用，保障系统安全。</li>
            <li>回复支持请求并处理您的请求（包括删除请求）。</li>
            <li>遵守法律义务。</li>
          </ul>
        ),
      },
      {
        id: 'sharing',
        title: '数据共享',
        body: (
          <>
            <p>我们不出售个人数据。数据仅在以下情况下共享：</p>
            <ul>
              <li>与“第三方服务”中列出的服务提供方共享，以运行应用所需为限。</li>
              <li>法律要求时，或为保护用户和我们的权利与安全。</li>
            </ul>
          </>
        ),
      },
      {
        id: 'security',
        title: '安全',
        body: (
          <ul>
            <li>应用、网站与服务器之间的所有连接均使用 HTTPS 加密。</li>
            <li>会话刷新令牌在服务器上仅以哈希形式保存；设备上的登录令牌保存在操作系统的安全存储中。</li>
            <li>只有 API 服务器可以访问账户数据库。</li>
            <li>没有任何传输或存储方式是绝对安全的，但我们会采取合理措施保护您的数据。</li>
          </ul>
        ),
      },
      {
        id: 'retention',
        title: '保存期限',
        body: (
          <ul>
            <li>账户数据：保存至您删除账户。</li>
            <li>登录会话：90 天未使用即过期；会话记录随账户一并删除。</li>
            <li>服务器技术日志：最多 {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} 天。</li>
            {s.firebaseAnalytics && (
              <li>Firebase Analytics 数据：最多 {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} 个月。</li>
            )}
            <li>
              删除请求处理记录（内部用户 ID、邮箱哈希值、请求和完成时间）：{c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} 天，用于证明请求已被处理。
            </li>
            <li>数据库自动备份（Cloudflare D1 Time Travel）：已删除的数据最多可能在备份中保留 {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} 天，之后自动过期。</li>
            <li>设备上的数据：保存至您在应用中删除或卸载应用。</li>
          </ul>
        ),
      },
      {
        id: 'rights',
        title: '您的权利和选择',
        body: (
          <ul>
            <li>联系 {c.email} 申请访问、更正或删除您的数据。</li>
            <li>在应用内或网页上删除账户：{c.deleteLink('删除账户')}。</li>
            <li>在设置中删除本机学习数据，或卸载应用。</li>
            {s.admob && <li>在 Android 设置中重置或删除广告 ID，或在 iOS 设置中关闭跟踪；在应用提供时更改广告同意选项。</li>}
            <li>
              在 {c.ext('https://myaccount.google.com/permissions', 'Google 账号')} 或 Apple ID 设置 → 通过 Apple 登录 中撤销应用的访问权限。
            </li>
          </ul>
        ),
      },
      {
        id: 'children',
        title: '儿童',
        body: (
          <p>
            本应用不面向 {c.num(c.site.policy.minimumAge, 'policy.minimumAge')} 岁以下的儿童。如果您认为我们收到了该年龄以下儿童的数据，请联系 {c.email}，我们会将其删除。
          </p>
        ),
      },
      {
        id: 'changes',
        title: '政策变更',
        body: <p>本政策变更时，我们会更新页面顶部的日期。如有重大变更，我们会在应用内或本网站上通知您。</p>,
      },
      {
        id: 'contact',
        title: '联系我们',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  terms: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'acceptance',
        title: '接受条款',
        body: (
          <p>
            下载或使用由 <strong>{c.developer}</strong> 提供的 <strong>{c.appName}</strong>，即表示您同意本条款。如不同意，请勿使用本应用。
          </p>
        ),
      },
      {
        id: 'service',
        title: '服务说明',
        body: (
          <p>
            {c.appName} 通过按级别、技能和主题整理的精选视频帮助您学习韩语。
            {s.admob ? '应用免费提供，并展示广告。' : '应用免费提供。'}大部分视频为 YouTube 上的第三方内容。
          </p>
        ),
      },
      {
        id: 'conditions',
        title: '使用条件',
        body: (
          <ul>
            <li>您须年满 {c.num(c.site.policy.minimumAge, 'policy.minimumAge')} 岁，或按您所在地法律取得父母或监护人的同意。</li>
            <li>您仅将应用用于个人、非商业的学习，并遵守法律。</li>
            {s.youtube && <li>观看视频时，您同时同意 {c.ext('https://www.youtube.com/t/terms', 'YouTube 服务条款')}。</li>}
          </ul>
        ),
      },
      {
        id: 'accounts',
        title: '账户',
        body: (
          <ul>
            <li>账户是可选的。您可以不登录使用应用。</li>
            <li>您使用 Google 或 Apple 账户登录，并负责保护该账户和您设备的安全。</li>
            <li>如怀疑账户遭到未经授权的访问，请联系 {c.email}。</li>
          </ul>
        ),
      },
      {
        id: 'deletion',
        title: '删除账户与终止',
        body: (
          <ul>
            <li>您可以随时在应用内或在{c.deleteLink('删除账户页面')}删除账户。删除是永久性的。</li>
            <li>如您违反本条款或损害服务，我们可以暂停或终止您的访问。</li>
            <li>您可以随时通过卸载应用停止使用。</li>
          </ul>
        ),
      },
      {
        id: 'ownership',
        title: '内容所有权',
        body: (
          <>
            <p>应用的名称、图标、设计、源代码、课程结构、翻译和文字归 {c.developer} 或其许可方所有。未经许可，不得复制、分发或用于商业用途。</p>
            {s.youtube && (
              <p>
                视频、视频标题和缩略图归相应 YouTube 频道所有者所有。应用仅通过 YouTube 官方播放器播放视频，按 YouTube 显示的信息注明来源，不下载、存储或修改视频。我们不拥有第三方内容，也不对其负责；所有者可随时删除视频。
              </p>
            )}
            <p>
              如您认为应用中的内容侵犯了您的权利，请联系 {c.email}。
              {s.youtube && '对于 YouTube 视频，您也可以直接向 YouTube 举报。'}
            </p>
          </>
        ),
      },
      {
        id: 'your-content',
        title: '您的内容',
        body: <p>您创建的笔记和学习数据归您所有，并保存在您的设备上。您对自己创建的内容负责。</p>,
      },
      {
        id: 'prohibited',
        title: '禁止行为',
        body: (
          <ul>
            <li>对应用进行反向工程、修改或重新分发，或绕过其保护措施。</li>
            <li>向我们的服务器和 API 发送自动化流量、抓取数据或使其过载。</li>
            <li>违反 YouTube 条款下载、复制或重新分发视频。</li>
            {s.admob && <li>点击自己的广告或制造虚假广告展示。</li>}
            <li>未经许可访问他人账户或冒充他人。</li>
            <li>将应用用于任何违法目的。</li>
          </ul>
        ),
      },
      ...(s.admob
        ? [
            {
              id: 'ads',
              title: '广告',
              body: <p>应用展示由 Google AdMob 提供的广告。我们不控制每条广告的内容；您与广告主之间的任何往来仅限于你们双方。有关个性化广告的选择，请参阅隐私政策。</p>,
            },
          ]
        : []),
      {
        id: 'disclaimer',
        title: '免责声明',
        body: <p>应用按“现状”和“现有”提供。我们不保证应用持续无中断或无错误，也不保证任何学习效果或 TOPIK 考试成绩。内容仅供学习参考。</p>,
      },
      {
        id: 'liability',
        title: '责任限制',
        body: (
          <p>
            在法律允许的范围内，{c.developer} 不对因使用或无法使用应用（包括第三方内容）而产生的间接、附带或后果性损害承担责任。本条款不限制您所在地法律规定不可排除的消费者权利。
          </p>
        ),
      },
      {
        id: 'changes',
        title: '服务和条款的变更',
        body: <p>我们可能增加、更改或停止某些功能，并更新本条款。页面顶部显示最新更新日期；如有重大变更，我们会在应用内或网站上通知您。继续使用应用即表示您接受新条款。</p>,
      },
      {
        id: 'contact',
        title: '联系我们',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  deletion: (c) => ({
    deleted: [
      '账户资料：用户 ID、显示名称和邮箱。',
      'Google/Apple 登录关联：提供方、账户标识符和邮箱。',
      '所有设备上的全部登录会话（您将被退出登录）。',
      ...(c.site.services.cloudSync ? ['已同步的学习数据：收藏、观看记录、笔记和进度。'] : []),
    ],
    kept: [
      <>服务器技术日志（IP 地址、时间、请求），用于安全和防止滥用；最多 {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} 天后自动删除。</>,
      <>删除请求处理记录（内部用户 ID、邮箱哈希值、请求和完成时间；不含邮箱地址），用于证明请求已执行；保存 {c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} 天。</>,
      <>数据库自动备份（Cloudflare D1 Time Travel）最多可能在 {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} 天内仍包含已删除的账户，之后自动过期。</>,
      ...(c.site.services.firebaseAnalytics || c.site.services.admob
        ? [
            <>
              Google 通过 {[c.site.services.firebaseAnalytics && 'Firebase Analytics', c.site.services.admob && 'AdMob'].filter(Boolean).join(' 和 ')} 处理的数据不与您的账户关联，因此无法按账户删除；这些数据按 Google 的政策保存
              {c.site.services.firebaseAnalytics && <>（Firebase Analytics：最多 {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} 个月）</>}。
            </>,
          ]
        : []),
      '法律要求我们保留的数据（如有）。',
    ],
    device: (
      <>
        <p>收藏、观看记录、笔记、学习进度和录音只保存在您的手机上，不在我们的服务器上。因此，通过网页删除账户<strong>无法删除</strong>这些数据。</p>
        <ul>
          <li>在应用内删除账户时，该设备上的学习数据也会被清除。</li>
          <li>通过网页删除后：应用下次连接服务器时会失去登录状态，但手机上的数据仍然保留。请进入 设置 → 账户 → 退出登录，然后选择“删除本机学习数据”；或卸载应用。</li>
        </ul>
      </>
    ),
  }),
};

export default content;
