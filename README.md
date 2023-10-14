# Bugs

-   `Nếu phát hiện hoặc có lỗi xảy ra --> Tạo Issue và gán cho người thực hiện phần đó`
    -   Vào tab Issues --> New issue.
    -   Mô tả bug, gán assignees (người làm phần đó), gán labels.

<br/>

# Quy trình làm việc

-   **B1.**: Chuyển nhánh làm việc

    -   **`TH1`**: Làm việc trên nhánh cũ --> update nhánh cũ lên bản mới nhất (~ develop)

        ```
        git checkout ten_nhanh_cu
        git rebase origin/develop
        ```

    -   **`TH2`**: Làm việc trên nhánh mới --> Tạo và checkout sang nhánh mới `(Lưu ý: Phải ở nhánh develop trước khi tạo nhánh mới)`

        ```
        git checkout develop
        git checkout -b feature/ten_tinh_nang
        ```

-   **B2.** Triển khai
    ```
    ... CODING ...
    ```
-   **B3.** Commit & Push

    -   Cấu trúc commit:

        ```
        git commit -m "<type>(scope): <description>"
        ```

    -   `description`: mô tả ngắn gọn nội dung commit

    -   `scope`: web/mobile/admin/server (Bỏ qua nếu không thuộc những phần trên)
    -   `type`
        | Tên | Mô tả | Ví dụ |
        | - | - | - |
        | `feat` | tính năng mới | ... "feat(mobile): add login screen" |
        | `fix` | fix bug | ... "fix(admin): Fix bug preventing users from submitting the subscribe form" |
        | `refactor` | sửa code để tối ưu khả năng đọc | ... "refactor(mobile): implement calculation method as recursion" |
        | `chore` | cập nhập dependencies, không liên quan tới fix hay feat | ... "chore(server): update npm dependency to latest version" |
        | `docs` | thêm/thay đổi doc | ... "docs: add api document" |
        | `style` | thay đổi mà không làm đổi ý nghĩa code | thay đổi CSS/UI,... |
        | `vender` | cập nhật version cho các dependencies, packages | |
        | `test` | add/remove/update tests | |

    -   Push code:
        ```
        git push origin feature/ten_tinh_nang
        ```

-   **B4.** Tạo pull-request

    1. Vào tab Pull Requests --> New pull request
    2. Chọn **base (develop)** và **compare (feature/ten_tinh_nang)** --> Create pull request
    3. Bổ sung Comment, Reviewers, **Assignees (assign yourself)**, **labels**, development (nếu fix lỗi) --> Create pull request
    4. Trường hợp bị `conflicts`

        - Cập nhật nhánh develop ở local về bản mới nhất

            ```
            git checkout develop
            git pull
            ```

        - Hiển thị conflict

            ```
            git checkout feature/ten_tinh_nang
            git merge develop
            ```

        - Thực hiện fix conflict với những file báo đỏ _(Accept Current/Incoming/Both Change)_

        - Commit và push code
            ```
            git add .
            git commit -m "fix(server/mobile...): fix merge conflicts"
            git push origin feature/ten_tinh_nang
            ```

    5. Merge code **(Không delete branch)**

-   **B5.** Khi đã merge xong, pull từ `develop` về local, quay lại **B1**

    ```
    git checkout develop

    git pull origin develop
    ```
