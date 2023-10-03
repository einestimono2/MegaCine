# Quy trình làm việc

-   **B1.** Tạo và checkout sang nhánh mới **(Lưu ý: Phải ở nhánh develop trước khi tạo nhánh mới)**

    ```
    git checkout develop

    git checkout -b feature/xxxx
    ```

-   **B2.** CODING ...
-   **B3.** Commit, push code

    ```
    git add .

    git push --set-upstream origin feature/xxxx
    ```

-   **B4.** Tạo merge-requests từ nhánh `feature/xxxx` vào nhánh `develop` (Không chọn **'Delete source branch when merge request is accepted'**)
    ```
    Nếu bị conflict -> fix conflict ->  Commit, push code lại
    ```
-   **B5.** Thêm người review **(Chọn tất cả thành viên)**
-   **B6.** Khi đã được merge, pull từ `develop` về local, quay lại **B1**

    ```
    git checkout develop

    git pull
    ```

# Conventional Commits

-   Cấu trúc: `<type>: <description>`
-   <description\>: mô tả ngắn gọn nội dung commit
-   <type\>
    -   `feat`: tính năng mới
        ```
        git commit -m "feat: add login screen"
        ```
    -   `fix`: fix bug
        ```
        git commit -m "fix: Fix bug preventing users from submitting the subscribe form"
        ```
    -   `refactor`: sửa code để tối ưu khả năng đọc
        ```
        git commit -m "refactor: implement calculation method as recursion"
        ```
    -   `chore`: cập nhập dependencies, không liên quan tới fix hay feat
        ```
        git commit -m "chore: update npm dependency to latest version"
        ```
    -   `docs`: thêm/thay đổi doc
        ```
        git commit -m "docs: add api document"
        ```
    -   `style`: thay đổi mà không làm đổi ý nghĩa code, ví dụ: thay đổi CSS/UI,...
    -   `perf`: cải tiến về hiệu năng
    -   `vender`: cập nhật version cho các dependencies, packages
    -   `test`: add/remove/update tests
    -   `revert`: reverts một hoặc nhiều commit trước đó
