// Hàm sleep: dùng để delay (chờ) trong async/await
// ms = milliseconds (ví dụ: 1000ms = 1 giây)
const sleep = (ms) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms) // sau ms thì resolve promise → tiếp tục code
    );

// Hàm retry nhận vào:
// fn: function bạn muốn retry (gọi DB, API, v.v.)
// options: config cho retry
async function retry(fn, options = {}) {

    // Destructure options + gán giá trị mặc định
    const {
        retries = 3, // số lần retry tối đa
        delay = 500, // delay ban đầu (ms)
        factor = 2, // hệ số nhân delay (exponential backoff)
        shouldRetry = () => true, // hàm kiểm tra lỗi có nên retry không
        onRetry = null, // callback để log hoặc tracking khi retry
    } = options;

    // attempt: số lần đã thử
    let attempt = 0;

    // vòng lặp retry
    // <= retries vì lần đầu tiên cũng được tính là attempt = 0
    while (attempt <= retries) {
        try {
            // thử chạy function fn
            // nếu thành công → return luôn kết quả
            return await fn();

        } catch (error) {
            // nếu fn bị lỗi sẽ nhảy vào đây

            // kiểm tra lỗi có được phép retry không
            // ví dụ: validation error thì không nên retry
            if (!shouldRetry(error)) {
                throw error; // ném lỗi ra ngoài luôn
            }

            // nếu đã retry đủ số lần thì dừng
            if (attempt === retries) {
                throw error; // hết lượt retry → throw lỗi
            }

            // tính thời gian delay theo exponential backoff
            // ví dụ:
            // attempt = 0 → 500ms
            // attempt = 1 → 1000ms
            // attempt = 2 → 2000ms
            const backoff = delay * Math.pow(factor, attempt);

            // nếu có custom handler (ví dụ: log bằng winston)
            if (onRetry) {
                onRetry({
                    attempt: attempt + 1, // lần retry hiện tại (bắt đầu từ 1)
                    delay: backoff, // thời gian sẽ chờ
                    error, // lỗi gặp phải
                });
            } else {
                // nếu không có thì log ra console
                console.log(
                    `Retry ${attempt + 1}/${retries} after ${backoff}ms: ${error.message}`
                );
            }

            // chờ theo thời gian backoff trước khi retry
            await sleep(backoff);

            // tăng số lần thử lên
            attempt++;
        }
    }
}

// export để dùng ở file khác
module.exports = retry;