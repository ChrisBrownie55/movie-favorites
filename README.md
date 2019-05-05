# Movie Favorites

### Features:

:white_check_mark: Add movies
<br>
:white_check_mark: Remove movies
<br>
:white_check_mark: Change title
<br>
:white_check_mark: Change genre
<br>
:white_check_mark: Change rating
<br>
:white_check_mark: No online database, all storage is done through [kv-storage](https://npm.im/kv-storage-polyfill)

### Possible future features

- [ ] Filtering:
  - Title
  - Genre
  - Highest rating
  - Lowest rating
- [ ] Save to online database
- [ ] Search movies via API
- [ ] Minimize "New Movie" form

### Tools used

⚛ **React:** Component model used throughout the entire app
<br>
:duck: **Redux:** Global state management, backed up to `kv-storage` with `.subscribe`
<br>
:muscle: **Font Awesome** (for React): used for trash and star SVGs
<br>
:tada: **React Select**: A drop-in `<select>` component replacement
<br>
:dash: **Tailwind CSS:** Fully customizable CSS framework
<br>
:zap: **KV Storage:** a module that works on top of IndexedDB
