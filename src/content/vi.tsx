import type { LegalContent } from './types';

const content: LegalContent = {
  privacy: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'gioi-thieu',
        title: 'Giới thiệu',
        body: (
          <>
            <p>
              Chính sách này giải thích cách ứng dụng <strong>{c.appName}</strong> (mã ứng dụng <code>{c.site.packageId}</code>) và
              website này, do <strong>{c.developer}</strong> (“chúng tôi”) phát triển, xử lý dữ liệu của bạn.
            </p>
            <p>Liên hệ về quyền riêng tư: {c.email}{c.site.developer.address && <> · Địa chỉ: {c.site.developer.address}</>}</p>
          </>
        ),
      },
      {
        id: 'tom-tat',
        title: 'Tóm tắt',
        body: (
          <ul>
            <li>Bạn có thể dùng ứng dụng mà không cần đăng nhập. Khi đó dữ liệu học chỉ lưu trên thiết bị của bạn.</li>
            <li>Nếu bạn đăng nhập bằng Google hoặc Apple, chúng tôi lưu một tài khoản trên máy chủ (mã định danh, tên hiển thị, email).</li>
            {(s.admob || s.firebaseAnalytics) && (
              <li>
                Ứng dụng dùng {[s.admob && 'Google AdMob (quảng cáo)', s.firebaseAnalytics && 'Firebase Analytics (thống kê sử dụng)'].filter(Boolean).join(' và ')}.
                Các dịch vụ này của Google thu thập dữ liệu thiết bị như mô tả bên dưới.
              </li>
            )}
            {s.youtube && <li>Video được phát qua trình phát YouTube.</li>}
            <li>Chúng tôi không bán dữ liệu cá nhân của bạn.</li>
            <li>Bạn có thể xóa tài khoản bất cứ lúc nào: {c.deleteLink('Xóa tài khoản')}.</li>
          </ul>
        ),
      },
      {
        id: 'tren-thiet-bi',
        title: 'Dữ liệu lưu trên thiết bị của bạn',
        body: (
          <>
            <p>Những dữ liệu sau được ứng dụng lưu trong bộ nhớ của thiết bị:</p>
            <ul>
              <li>Video và danh sách phát yêu thích, lịch sử xem, ghi chú cho từng video.</li>
              <li>Tiến độ học, từ đã lưu, kết quả luyện tập và điểm kinh nghiệm (XP).</li>
              <li>Bản ghi âm luyện nói, chỉ khi bạn dùng tính năng ghi âm (cần quyền micro). Bản ghi âm không được tải lên.</li>
              <li>Cài đặt như ngôn ngữ giao diện.</li>
              <li>Mã đăng nhập (nếu bạn đăng nhập), lưu trong vùng lưu trữ an toàn của hệ điều hành (Keychain/Keystore).</li>
            </ul>
            {s.cloudSync ? (
              <p>Khi bạn đăng nhập, yêu thích, lịch sử, ghi chú và tiến độ học được đồng bộ lên máy chủ để dùng trên nhiều thiết bị.</p>
            ) : (
              <p>
                Hiện tại ứng dụng <strong>không</strong> gửi dữ liệu học này lên máy chủ của chúng tôi, kể cả khi bạn đăng nhập. Nếu
                tính năng đồng bộ được thêm, chúng tôi sẽ cập nhật chính sách này trước.
              </p>
            )}
            <p>
              Bạn có thể xóa dữ liệu này trong ứng dụng (Cài đặt → Tài khoản → Xóa dữ liệu học trên máy, hoặc Xóa tài khoản) hoặc
              bằng cách gỡ ứng dụng.
            </p>
          </>
        ),
      },
      {
        id: 'tai-khoan',
        title: 'Dữ liệu tài khoản khi bạn đăng nhập',
        body: (
          <>
            <p>
              Đăng nhập là tùy chọn, bằng{' '}
              {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' hoặc ')}. Từ nhà cung cấp, chúng tôi
              nhận mã định danh tài khoản, địa chỉ email (Apple có thể cung cấp email ẩn danh nếu bạn chọn “Ẩn email của tôi”) và
              tên nếu nhà cung cấp gửi kèm. Chúng tôi không bao giờ nhận mật khẩu của bạn.
            </p>
            <p>Trên máy chủ, chúng tôi lưu:</p>
            <ul>
              <li>Hồ sơ tài khoản: mã người dùng nội bộ, tên hiển thị, email đã được nhà cung cấp xác minh, thời điểm tạo và lần hoạt động gần nhất.</li>
              <li>Liên kết đăng nhập: nhà cung cấp (Google/Apple), mã định danh tài khoản tại nhà cung cấp, email.</li>
              <li>
                Phiên đăng nhập: nền tảng (Android/iOS), phiên bản ứng dụng, thời điểm tạo, sử dụng gần nhất và hết hạn. Mã làm mới
                phiên chỉ được lưu dưới dạng băm (hash).
              </li>
            </ul>
            <p>Mục đích: nhận diện bạn, giữ trạng thái đăng nhập, bảo vệ tài khoản và xử lý yêu cầu xóa tài khoản.</p>
          </>
        ),
      },
      {
        id: 'may-chu',
        title: 'Dữ liệu kỹ thuật khi ứng dụng kết nối máy chủ',
        body: (
          <>
            <p>
              Máy chủ API của chúng tôi chạy trên Cloudflare. Mỗi yêu cầu từ ứng dụng (ví dụ tải danh sách video, đăng nhập) gửi
              kèm địa chỉ IP, thời gian và thông tin yêu cầu. Chúng tôi dùng các dữ liệu này để giới hạn tần suất truy cập, chống lạm
              dụng và ghi nhận lỗi. Nhật ký kỹ thuật được lưu tối đa {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} ngày.
            </p>
            {s.youtube && (
              <p>Để lấy danh sách video, máy chủ gọi YouTube Data API. Bước này không gửi thông tin cá nhân của bạn tới YouTube.</p>
            )}
          </>
        ),
      },
      {
        id: 'ben-thu-ba',
        title: 'Dịch vụ bên thứ ba',
        body: (
          <>
            <p>Các dịch vụ sau hoạt động trong ứng dụng và tự xử lý dữ liệu theo chính sách riêng của họ:</p>
            <ul>
              {s.youtube && (
                <li>
                  <strong>YouTube (Google)</strong>: video được phát bằng trình phát nhúng của YouTube. Khi bạn xem, YouTube có thể thu
                  thập địa chỉ IP, thông tin thiết bị, hoạt động xem và dùng cookie hoặc định danh tương tự. Xem{' '}
                  {c.ext('https://www.youtube.com/t/terms', 'Điều khoản YouTube')} và{' '}
                  {c.ext('https://policies.google.com/privacy', 'Chính sách quyền riêng tư của Google')}.
                </li>
              )}
              {s.admob && (
                <li>
                  <strong>Google AdMob</strong>: hiển thị quảng cáo. Có thể thu thập mã quảng cáo của thiết bị (Android Advertising ID,
                  hoặc IDFA trên iOS nếu bạn cho phép), địa chỉ IP, thông tin thiết bị và hệ điều hành, vị trí ước tính từ IP và tương
                  tác với quảng cáo. Tại EEA, Vương quốc Anh và Thụy Sĩ, ứng dụng xin sự đồng ý của bạn qua công cụ của Google trước
                  khi hiển thị quảng cáo; trên iOS, ứng dụng hỏi quyền theo dõi theo App Tracking Transparency. Xem{' '}
                  {c.ext('https://policies.google.com/technologies/partner-sites', 'Cách Google sử dụng dữ liệu từ ứng dụng đối tác')}.
                </li>
              )}
              {s.firebaseAnalytics && (
                <li>
                  <strong>Firebase Analytics (Google)</strong>: thống kê cách ứng dụng được sử dụng, gồm màn hình đã xem, các lượt chọn
                  danh mục và menu, mã cài đặt ứng dụng, kiểu thiết bị, hệ điều hành, phiên bản ứng dụng, ngôn ngữ, quốc gia hoặc vị trí
                  ước tính, và có thể cả mã quảng cáo. Dữ liệu này không gắn với tài khoản của bạn và được lưu tối đa{' '}
                  {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} tháng. Xem{' '}
                  {c.ext('https://firebase.google.com/support/privacy', 'Quyền riêng tư và bảo mật trong Firebase')}.
                </li>
              )}
              {(s.googleSignIn || s.appleSignIn) && (
                <li>
                  <strong>Đăng nhập bằng {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' / ')}</strong>:
                  nhà cung cấp xác thực bạn và gửi cho chúng tôi các thông tin nêu ở mục “Dữ liệu tài khoản”. Xem{' '}
                  {s.googleSignIn && c.ext('https://policies.google.com/privacy', 'Google')}
                  {s.googleSignIn && s.appleSignIn && ' và '}
                  {s.appleSignIn && c.ext('https://www.apple.com/legal/privacy/', 'Apple')}.
                </li>
              )}
              <li>
                <strong>Cloudflare</strong>: lưu trữ máy chủ API và cơ sở dữ liệu tài khoản. Xem{' '}
                {c.ext('https://www.cloudflare.com/privacypolicy/', 'Chính sách quyền riêng tư của Cloudflare')}.
              </li>
              {c.site.services.resendEmail && (
                <li>
                  <strong>Resend</strong>: gửi email xác nhận xóa tài khoản. Resend nhận địa chỉ email người nhận và nội dung email. Xem{' '}
                  {c.ext('https://resend.com/legal/privacy-policy', 'Chính sách quyền riêng tư của Resend')}.
                </li>
              )}
            </ul>
          </>
        ),
      },
      {
        id: 'website',
        title: 'Website này',
        body: (
          <ul>
            <li>Website không dùng quảng cáo hay công cụ thống kê. Website chỉ lưu một cookie để ghi nhớ ngôn ngữ bạn chọn.</li>
            <li>Như mọi website, máy chủ lưu trữ có thể ghi nhật ký truy cập kỹ thuật (địa chỉ IP, thời gian, trang được yêu cầu) để vận hành và bảo mật.</li>
            <li>
              Khi bạn yêu cầu xóa tài khoản trên web, email bạn nhập được gửi tới máy chủ của chúng tôi để tìm tài khoản liên kết và gửi liên
              kết xác nhận tới chính địa chỉ đó. Chúng tôi không lưu địa chỉ email trong hồ sơ yêu cầu, chỉ lưu mã băm (SHA-256) của nó. Mã
              xác nhận chỉ được lưu dưới dạng băm, hết hạn sau 30 phút và chỉ dùng được một lần.
            </li>
          </ul>
        ),
      },
      {
        id: 'muc-dich',
        title: 'Mục đích sử dụng dữ liệu',
        body: (
          <ul>
            <li>Cung cấp các tính năng của ứng dụng và ghi nhớ dữ liệu học của bạn.</li>
            <li>Đăng nhập, giữ phiên và bảo vệ tài khoản.</li>
            {s.admob && <li>Hiển thị quảng cáo để duy trì ứng dụng miễn phí.</li>}
            {s.firebaseAnalytics && <li>Hiểu cách ứng dụng được sử dụng để cải thiện nội dung và sửa lỗi.</li>}
            <li>Chống lạm dụng và đảm bảo an toàn hệ thống.</li>
            <li>Trả lời hỗ trợ và xử lý yêu cầu của bạn, kể cả yêu cầu xóa.</li>
            <li>Tuân thủ nghĩa vụ pháp lý.</li>
          </ul>
        ),
      },
      {
        id: 'chia-se',
        title: 'Chia sẻ dữ liệu',
        body: (
          <>
            <p>Chúng tôi không bán dữ liệu cá nhân. Dữ liệu chỉ được chia sẻ:</p>
            <ul>
              <li>Với các nhà cung cấp dịch vụ nêu ở mục “Dịch vụ bên thứ ba”, trong phạm vi cần thiết để vận hành ứng dụng.</li>
              <li>Khi pháp luật yêu cầu hoặc để bảo vệ quyền, an toàn của người dùng và của chúng tôi.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'bao-mat',
        title: 'Bảo mật',
        body: (
          <ul>
            <li>Mọi kết nối giữa ứng dụng, website và máy chủ đều được mã hóa bằng HTTPS.</li>
            <li>Mã làm mới phiên chỉ được lưu dạng băm trên máy chủ; mã đăng nhập trên thiết bị nằm trong vùng lưu trữ an toàn của hệ điều hành.</li>
            <li>Chỉ máy chủ API được truy cập cơ sở dữ liệu tài khoản.</li>
            <li>Không có phương thức truyền hay lưu trữ nào an toàn tuyệt đối, nhưng chúng tôi áp dụng các biện pháp hợp lý để bảo vệ dữ liệu.</li>
          </ul>
        ),
      },
      {
        id: 'luu-giu',
        title: 'Thời gian lưu giữ',
        body: (
          <ul>
            <li>Dữ liệu tài khoản: cho đến khi bạn xóa tài khoản.</li>
            <li>Phiên đăng nhập: hết hạn sau 90 ngày không sử dụng; bản ghi phiên bị xóa cùng tài khoản.</li>
            <li>Nhật ký kỹ thuật của máy chủ: tối đa {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} ngày.</li>
            {s.firebaseAnalytics && (
              <li>Dữ liệu Firebase Analytics: tối đa {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} tháng.</li>
            )}
            <li>
              Hồ sơ xử lý yêu cầu xóa (mã người dùng nội bộ, mã băm của email, thời điểm yêu cầu và hoàn tất): {c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} ngày,
              để chứng minh yêu cầu đã được xử lý.
            </li>
            <li>Bản sao lưu tự động của cơ sở dữ liệu (Cloudflare D1 Time Travel): dữ liệu đã xóa có thể còn trong bản sao lưu tối đa {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} ngày, sau đó tự hết hạn.</li>
            <li>Dữ liệu trên thiết bị: cho đến khi bạn xóa trong ứng dụng hoặc gỡ ứng dụng.</li>
          </ul>
        ),
      },
      {
        id: 'quyen',
        title: 'Quyền và lựa chọn của bạn',
        body: (
          <ul>
            <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu của bạn bằng cách liên hệ {c.email}.</li>
            <li>Xóa tài khoản trong ứng dụng hoặc trên web: {c.deleteLink('Xóa tài khoản')}.</li>
            <li>Xóa dữ liệu học trên thiết bị trong Cài đặt, hoặc gỡ ứng dụng.</li>
            {s.admob && (
              <li>Đặt lại hoặc xóa mã quảng cáo trong cài đặt Android, hoặc tắt quyền theo dõi trong cài đặt iOS; thay đổi lựa chọn đồng ý quảng cáo khi ứng dụng cung cấp.</li>
            )}
            <li>
              Thu hồi quyền truy cập của ứng dụng tại{' '}
              {c.ext('https://myaccount.google.com/permissions', 'tài khoản Google')} hoặc trong cài đặt Apple ID → Đăng nhập bằng Apple.
            </li>
          </ul>
        ),
      },
      {
        id: 'tre-em',
        title: 'Trẻ em',
        body: (
          <p>
            Ứng dụng không dành cho trẻ em dưới {c.num(c.site.policy.minimumAge, 'policy.minimumAge')} tuổi. Nếu bạn cho rằng chúng tôi
            đã nhận dữ liệu của một trẻ em dưới độ tuổi này, hãy liên hệ {c.email} để chúng tôi xóa.
          </p>
        ),
      },
      {
        id: 'thay-doi',
        title: 'Thay đổi chính sách',
        body: (
          <p>
            Khi chính sách thay đổi, chúng tôi cập nhật ngày ở đầu trang. Với thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng
            dụng hoặc trên website này.
          </p>
        ),
      },
      {
        id: 'lien-he',
        title: 'Liên hệ',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  terms: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'chap-nhan',
        title: 'Chấp nhận điều khoản',
        body: (
          <p>
            Khi tải xuống hoặc sử dụng <strong>{c.appName}</strong> do <strong>{c.developer}</strong> cung cấp, bạn đồng ý với các điều
            khoản này. Nếu không đồng ý, vui lòng không sử dụng ứng dụng.
          </p>
        ),
      },
      {
        id: 'dich-vu',
        title: 'Dịch vụ',
        body: (
          <p>
            {c.appName} giúp bạn học tiếng Hàn qua các video được chọn lọc và sắp xếp theo cấp độ, kỹ năng và chủ đề.
            {s.admob ? ' Ứng dụng được cung cấp miễn phí và có hiển thị quảng cáo.' : ' Ứng dụng được cung cấp miễn phí.'} Phần lớn
            video là nội dung của bên thứ ba trên YouTube.
          </p>
        ),
      },
      {
        id: 'dieu-kien',
        title: 'Điều kiện sử dụng',
        body: (
          <ul>
            <li>
              Bạn phải từ {c.num(c.site.policy.minimumAge, 'policy.minimumAge')} tuổi trở lên, hoặc có sự đồng ý của cha mẹ/người giám hộ
              theo quy định pháp luật nơi bạn sống.
            </li>
            <li>Bạn sử dụng ứng dụng cho mục đích học tập cá nhân, phi thương mại và tuân thủ pháp luật.</li>
            {s.youtube && (
              <li>Khi xem video, bạn cũng đồng ý với {c.ext('https://www.youtube.com/t/terms', 'Điều khoản dịch vụ của YouTube')}.</li>
            )}
          </ul>
        ),
      },
      {
        id: 'tai-khoan',
        title: 'Tài khoản',
        body: (
          <ul>
            <li>Tài khoản là tùy chọn. Bạn có thể dùng ứng dụng mà không cần đăng nhập.</li>
            <li>Bạn đăng nhập bằng tài khoản Google hoặc Apple và chịu trách nhiệm bảo vệ tài khoản đó cũng như thiết bị của mình.</li>
            <li>Hãy liên hệ {c.email} nếu bạn nghi ngờ tài khoản bị truy cập trái phép.</li>
          </ul>
        ),
      },
      {
        id: 'xoa-tai-khoan',
        title: 'Xóa tài khoản và chấm dứt',
        body: (
          <ul>
            <li>Bạn có thể xóa tài khoản bất cứ lúc nào trong ứng dụng hoặc tại {c.deleteLink('trang Xóa tài khoản')}. Việc xóa là vĩnh viễn.</li>
            <li>Chúng tôi có thể tạm ngừng hoặc chấm dứt quyền truy cập nếu bạn vi phạm các điều khoản này hoặc gây hại cho dịch vụ.</li>
            <li>Bạn có thể ngừng sử dụng ứng dụng bất cứ lúc nào bằng cách gỡ cài đặt.</li>
          </ul>
        ),
      },
      {
        id: 'so-huu',
        title: 'Quyền sở hữu nội dung',
        body: (
          <>
            <p>
              Tên, biểu tượng, giao diện, mã nguồn, cách tổ chức khóa học, bản dịch và văn bản trong ứng dụng thuộc về {c.developer}{' '}
              hoặc bên cấp phép. Bạn không được sao chép, phân phối hay khai thác thương mại khi chưa có sự cho phép.
            </p>
            {s.youtube && (
              <p>
                Video, tiêu đề và ảnh thu nhỏ của video thuộc về chủ sở hữu kênh YouTube tương ứng. Ứng dụng chỉ phát video qua trình
                phát chính thức của YouTube, ghi nguồn theo thông tin YouTube hiển thị, và không tải xuống, lưu trữ hay chỉnh sửa video.
                Chúng tôi không sở hữu và không chịu trách nhiệm về nội dung của bên thứ ba; video có thể bị chủ sở hữu gỡ bỏ bất cứ lúc nào.
              </p>
            )}
            <p>
              Nếu bạn cho rằng nội dung trong ứng dụng vi phạm quyền của bạn, hãy liên hệ {c.email}.
              {s.youtube && ' Với video YouTube, bạn cũng có thể báo cáo trực tiếp tới YouTube.'}
            </p>
          </>
        ),
      },
      {
        id: 'noi-dung-cua-ban',
        title: 'Nội dung của bạn',
        body: <p>Ghi chú và dữ liệu học bạn tạo thuộc về bạn và được lưu trên thiết bị. Bạn chịu trách nhiệm về nội dung mình tạo ra.</p>,
      },
      {
        id: 'cam',
        title: 'Hành vi bị cấm',
        body: (
          <ul>
            <li>Dịch ngược, sửa đổi, phát hành lại ứng dụng hoặc vượt qua các biện pháp bảo vệ của ứng dụng.</li>
            <li>Gửi lượng truy cập tự động, khai thác hoặc làm quá tải máy chủ và API của chúng tôi.</li>
            <li>Tải xuống, sao chép hoặc phân phối lại video trái với điều khoản của YouTube.</li>
            {s.admob && <li>Tự nhấp hoặc tạo lượt hiển thị quảng cáo giả.</li>}
            <li>Truy cập trái phép tài khoản của người khác hoặc mạo danh người khác.</li>
            <li>Sử dụng ứng dụng cho mục đích trái pháp luật.</li>
          </ul>
        ),
      },
      ...(s.admob
        ? [
            {
              id: 'quang-cao',
              title: 'Quảng cáo',
              body: (
                <p>
                  Ứng dụng hiển thị quảng cáo do Google AdMob cung cấp. Chúng tôi không kiểm soát nội dung từng quảng cáo; mọi giao dịch
                  giữa bạn và nhà quảng cáo là giữa hai bên. Lựa chọn về quảng cáo được cá nhân hóa được mô tả trong Chính sách quyền riêng tư.
                </p>
              ),
            },
          ]
        : []),
      {
        id: 'mien-tru',
        title: 'Miễn trừ bảo đảm',
        body: (
          <p>
            Ứng dụng được cung cấp “nguyên trạng” và “như hiện có”. Chúng tôi không bảo đảm ứng dụng luôn hoạt động liên tục, không có
            lỗi, hay bảo đảm kết quả học tập hoặc kết quả thi TOPIK. Nội dung chỉ nhằm mục đích tham khảo học tập.
          </p>
        ),
      },
      {
        id: 'gioi-han',
        title: 'Giới hạn trách nhiệm',
        body: (
          <p>
            Trong phạm vi pháp luật cho phép, {c.developer} không chịu trách nhiệm về thiệt hại gián tiếp, ngẫu nhiên hoặc hệ quả phát
            sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng, kể cả nội dung của bên thứ ba. Điều khoản này không hạn chế các quyền
            mà pháp luật bảo vệ người tiêu dùng nơi bạn sống không cho phép loại trừ.
          </p>
        ),
      },
      {
        id: 'thay-doi',
        title: 'Thay đổi dịch vụ và điều khoản',
        body: (
          <p>
            Chúng tôi có thể thêm, thay đổi hoặc ngừng tính năng, và cập nhật các điều khoản này. Ngày cập nhật được ghi ở đầu trang;
            với thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng dụng hoặc trên website. Việc bạn tiếp tục sử dụng đồng nghĩa với
            việc chấp nhận điều khoản mới.
          </p>
        ),
      },
      {
        id: 'lien-he',
        title: 'Liên hệ',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  deletion: (c) => ({
    deleted: [
      'Hồ sơ tài khoản: mã người dùng, tên hiển thị và email.',
      'Liên kết đăng nhập Google/Apple: nhà cung cấp, mã định danh tài khoản và email.',
      'Mọi phiên đăng nhập trên mọi thiết bị (bạn sẽ bị đăng xuất).',
      ...(c.site.services.cloudSync ? ['Dữ liệu học đã đồng bộ: yêu thích, lịch sử, ghi chú và tiến độ.'] : []),
    ],
    kept: [
      <>
        Nhật ký kỹ thuật của máy chủ (địa chỉ IP, thời gian, yêu cầu), để bảo mật và chống lạm dụng; tự xóa sau tối đa{' '}
        {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} ngày.
      </>,
      <>
        Hồ sơ xử lý yêu cầu xóa (mã người dùng nội bộ, mã băm của email, thời điểm yêu cầu và hoàn tất; không lưu địa chỉ email), để
        chứng minh yêu cầu đã được thực hiện; giữ {c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} ngày.
      </>,
      <>
        Bản sao lưu tự động của cơ sở dữ liệu (Cloudflare D1 Time Travel) có thể còn chứa tài khoản đã xóa tối đa{' '}
        {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} ngày, sau đó tự hết hạn.
      </>,
      ...(c.site.services.firebaseAnalytics || c.site.services.admob
        ? [
            <>
              Dữ liệu do Google xử lý qua {[c.site.services.firebaseAnalytics && 'Firebase Analytics', c.site.services.admob && 'AdMob'].filter(Boolean).join(' và ')}{' '}
              không gắn với tài khoản của bạn nên không thể xóa theo tài khoản; dữ liệu này được lưu theo chính sách của Google
              {c.site.services.firebaseAnalytics && <> (Firebase Analytics: tối đa {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} tháng)</>}.
            </>,
          ]
        : []),
      'Dữ liệu chúng tôi bắt buộc phải lưu theo quy định pháp luật, nếu có.',
    ],
    device: (
      <>
        <p>
          Yêu thích, lịch sử xem, ghi chú, tiến độ học và bản ghi âm chỉ được lưu trên điện thoại, không nằm trên máy chủ. Vì vậy xóa
          tài khoản qua web <strong>không xóa được</strong> dữ liệu này.
        </p>
        <ul>
          <li>Xóa tài khoản trong ứng dụng: dữ liệu học trên máy đó cũng bị xóa.</li>
          <li>
            Sau khi xóa qua web: ứng dụng mất phiên đăng nhập khi kết nối lại máy chủ, nhưng dữ liệu trên máy vẫn còn. Hãy vào Cài đặt →
            Tài khoản → Đăng xuất, rồi chọn “Xóa dữ liệu học trên máy”; hoặc gỡ ứng dụng.
          </li>
        </ul>
      </>
    ),
  }),
};

export default content;
