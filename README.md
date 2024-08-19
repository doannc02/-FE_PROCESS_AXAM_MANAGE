# Apus New base source NextJS + ReactJS - Rule & Coding conventions (NextJS + ReactJS)

## About NextJS

- Mặc định là Server Side Rendering
- Tự động phân chia code để load trang nhanh hơn
- Client side routing rất đơn giản (với nền tảng là page)
- Hỗ trợ Webpack môi trường dev hỗ trợ Hot Module Replacement (HMR)
- Có thể cài đặt với Express hay bất cứ Node.js HTTP server nào
- Có thể customizable với Babel and Webpack configurations của bạn

<br/>

## Project Structure - Cấu trúc Project

- Cấu trúc tổng quan 1 Project

- Thư mục **public**: Là thư mục chứa các file static styles, i18n...
- Thư mục **pages**: Là thư mục quan trọng chứa các page trong dự án. Trong Nextjs mỗi một file trong thư mục pages sẽ là một url của dự án [Next.js Documentation](https://nextjs.org/docs/basic-features/pages)
- Thư mục **Components**: Chứa khung các component khung giao diện cho project, được tổ chức theo automic design ( atom, molecules, organism, template )
- Thư mục **Atoms**: Chứa các đơn components common nhất của dự án như input, button, selectbox
- Thư mục **Molecules**: Chứa một hay nhiều component của atom. Molecule có thể có các thuộc tính của chính nó và tạo ra các hàm mà được dùng bởi atom, trong khi atom sẽ không có bất kỳ hàm hay action nào cả.
- Thư mục **Organism**: Organism là tập hợp nhiều molecule làm việc cùng nhau hay thậm chí có thể bao gồm các atom để tạo nên các giao diện chi tiết hơn.
- Thư mục **Template**: Sắp xếp và xây dựng khuôn mẫu cho page. Trong project này, mỗi teamplate đại diện cho 1 component pages.
- Thư mục **Layout**: Cấu hình layout của dự án, có thể có multiple layout.
- Thư mục **Hooks**: Chứa các hooks chung của dự án ( dialog hook, upload image hook...)
- Thư mục **Redux**: Cấu hình redux chung của dự án
- Thư mục **src**: Chứa các common component cơ bản dùng chung trong nhiều project như Button, Link...
- Thư mục **helper**: Là thư mục chứa các tiện ích chung của project như contain, format, utils...
- Thư mục **config**: Là thư mục chứa các config chung cho project như api, constant, helpers...
- Thư mục **api**: Là thư mục chứa những functions đảm nhiệm chuyện gọi API...
- Thư mục **service**: Định nghĩa các interface và endpoint api
- File **\_app.js**: File có thể override và wrapper các pages...
- File **\_document.js**: customizing chung html cho các page, customizing renderPage sử dụng with css-in-js của thư viện

## Library - Các thư viện sử dụng thiết yếu

- **Next.js** - Minimalistic framework for server-rendered React applications.
- **Babel** - The compiler for next generation JavaScript.
- **React hook form** - Thư viện quản lý và theo dõi form. (Thư viện quan trọng bậc nhất trong dự án)
- **Recoil, Redux toolkit** - Thư viện quản lý global state.
- **React Query** - Cung cấp nhiều hooks với API cực kì đơn giản để fetch cũng như update dữ liệu từ server. Hỗ trợ sẵn caching, refetching và nhiều thứ khác...
- **TailwindCSS** - Thư viện CSS https://tailwindcss.com/


* [ ] Routing: nextjs
* [ ] State Management: useContext Hook react or Redux
* [ ] Utility: JavaScript ES6
* [ ] UI Components: @material-ui
* [ ] Management form: rules + zod
* [ ] Styling: Styled Components + tailwindCss
* [ ] Asynchronous Requests: axios
* [ ] Time: moment
* [ ] Management cookie: js-cookie

## Getting Started

### `yarn dev`

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Runs next dev which starts Next.js in development mode

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### `yarn build`

```bash
npm run build
# or
yarn build
```

Runs next build which builds the application for production usage

### `yarn start`

Runs next start which starts a Next.js production server

Builds the app for production to the `build` folder.

## Rules & conventions

- [ ] ESLints _(AirBnb Config)_
- [ ] prettier
      **React/JSX**

## Những luật cơ bản

- Chỉ chứa một React Component trong 1 file.
- Luôn luôn sử dụng cú pháp JSX.
- Không sử dụng `React.createElement` chung với cú pháp JSX.


## Đặt tên

- **Phần mở rộng(extensions)**: Sử dụng phần mở rộng `.tsx` cho React Components.
- **Tên file**: Sử dụng chuẩn PascalCase cho tên file. Ví dụ: `ReservationCard.tsx`.
- **Tên tham chiếu(Reference Naming)**: Sử dụng PascalCase cho React components và dùng camelCase cho các đối tượng(instances) của chúng.(eslint + Prettier)

  ```jsx
  // tệ
  import reservationCard from "./ReservationCard";

  // tốt
  import ReservationCard from "./ReservationCard";

  // tệ
  const ReservationItem = <ReservationCard />;

  // tốt
  const reservationItem = <ReservationCard />;
  ```

- **Đặt tên Component**: Sử dụng tên Folder trùng với tên component, file là index.tsx

  ```jsx
  // tệ
  import Footer from "./Footer/Footer";

  // tệ
  import Footer from "./Footer/index";

  // tốt
  import Footer from "./Footer";
  ```

- **Đặt tên Props**: Tránh sử dụng tên props của DOM Component cho mục đích khác.

  ```jsx
  // tệ
  <MyComponent style="fancy" />

  // tệ
  <MyComponent className="fancy" />

  // tốt
  <MyComponent variant="fancy" />
  ```

## Căn chỉnh mã nguồn

- Căn chỉnh cho cú pháp JS. (eslint + Prettier)

  ```jsx
  // tệ
  <Foo superLongParam="bar"
       anotherSuperLongParam="baz" />

  // tốt
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />

  // Nếu props phù hợp trong một dòng thì giữ nó trên cùng một dòng
  <Foo bar="bar" />

  // Component con được thụt lề bình thường
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  >
    <Quux />
  </Foo>
  ```

## Dấu nháy đơn và nháy kép

- Luôn luôn sử dụng dấu ngoặc kép (`"`) cho các thuộc tính JSX, nhưng dấu nháy đơn (`'`) cho tất cả các JS khác. Eslint: (Prettier)

  ```jsx
  // tệ
  <Foo bar='bar' />

  // tốt
  <Foo bar="bar" />

  // tệ
  <Foo style={{ left: "20px" }} />

  // tốt
  <Foo style={{ left: '20px' }} />
  ```

## Khoảng trắng

- Luôn luôn có duy nhất một kí tự space(khoảng trắng) trong thẻ tự đóng. (eslint + Prettier)

  ```jsx
  // tệ
  <Foo/>

  // rất tệ
  <Foo                 />

  // tệ
  <Foo
  />

  // tốt
  <Foo />
  ```

- Không dùng khoảng trắng giữa giá trị bên trong ngoặc nhọn. (eslint + Prettier)

  ```jsx
  // tệ
  <Foo bar={ baz } />

  // tốt
  <Foo bar={baz} />
  ```

## Props

- Luôn luôn sử dụng camelCase khi đặt tên prop (camelCase : viết hoa chữa cái đầu của các từ , từ đầu tiên của cụm thì viết thường) (eslint + Prettier)

  ```jsx
  // tệ
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // tốt
  <Foo
    userName="hello"
    phoneNumber={12345678}
  />
  ```

- Bỏ giá trị của prop khi nó thực sự rõ ràng là `true`.

  ```jsx
  // tệ
  <Foo
    hidden={true}
  />

  // tốt
  <Foo hidden />
  ```

- Luôn luôn sử dụng prop `alt` trong thẻ `<img>`. Nếu giá trị của thẻ là NULL , `alt` có thể là một chuỗi rỗng hoặc `<img>` phải có thuộc tính `role="presentation"`. (eslint + Prettier)

  ```jsx
  // tệ
  <img src="hello.jpg" />

  // tốt
  <img src="hello.jpg" alt="Me waving hello" />

  // tốt
  <img src="hello.jpg" alt="" />

  // tốt
  <img src="hello.jpg" role="presentation" />
  ```

- Tránh dùng chỉ số của mảng(index) cho thuộc tính `key`, nên sử dụng một unique ID(định danh duy nhất).

  ```jsx
  // tệ
  {
    todos.map((todo, index) => <Todo {...todo} key={index} />);
  }

  // tốt
  {
    todos.map((todo) => <Todo {...todo} key={todo.id} />);
  }
  ```

- Ghi chú: Nên lọc các props không cần thiết khi có thể.

  ```jsx
  // tốt
  render() {
    const { irrelevantProp, ...relevantProps  } = this.props;
    return <WrappedComponent {...relevantProps} />
  }

  // tệ
  render() {
    const { irrelevantProp, ...relevantProps  } = this.props;
    return <WrappedComponent {...this.props} />
  }
  ```

## Refs

- Luôn sử dụng hàm gọi lại(callback) cho khai báo ref. (eslint)

  ```jsx
  // tệ
  <Foo
    ref="myRef"
  />

  // tốt
  <Foo
    ref={(ref) => { this.myRef = ref; }}
  />
  ```

## Dấu ngoặc đơn

- Đóng gói các thẻ JSX trong ngoặc đơn khi chúng kéo dài nhiều dòng.(eslint + pretier)

  ```jsx
  // tệ
  render() {
    return <MyComponent variant="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }

  // Tốt
  render() {
    return (
      <MyComponent variant="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }

  // Tốt, Khi chỉ có 1 dòng
  render() {
    const body = <div>hello</div>;
    return <MyComponent>{body}</MyComponent>;
  }
  ```

## Thẻ

- Luôn luôn tự đóng các thẻ(tags) không có con. (eslint + pretier)

  ```jsx
  // tệ
  <Foo variant="stuff"></Foo>

  // tốt
  <Foo variant="stuff" />
  ```

- Nếu Component của bạn có thuộc tính nhiều dòng, hãy đóng thẻ đó trên 1 dòng mới. (eslint + pretier)

  ```jsx
  // tệ
  <Foo
    bar="bar"
    baz="baz" />

  // tốt
  <Foo
    bar="bar"
    baz="baz"
  />
  ```

## Phương thức

- Sử dụng arrow function để bao đóng các biến cục bộ.

  ```jsx
  function ItemList(props) {
    return (
      <ul>
        {props.items.map((item, index) => (
          <Item key={item.key} onClick={() => todo(item.name, index)} />
        ))}
      </ul>
    );
  }
  ```

## Extensions for VSCode (Plugin cho việc Code - nên cài để thống nhất team, hỗ trợ coding convension)

[Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)

- Thằng này giúp tô màu các dấu ()[]{}, nhìn 1 phát là biết cái nào đi cặp với cái nào, không còn lẫn lộn, thừa thiếu dấu ...

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

- Thằng này giúp ta kiểm tra viết comment sai chính tả, đặt tên hàm, tên biến theo chuẩn camelCase code. Extension này sẽ highlight những đoạn sai chính tả để mình sửa.

[ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- Thằng này giúp chúng ta code nhanh hơn bằng việc đã gom những hàm viết tắt(clg → console.log(object))

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- Thằng ESLint sẽ giúp ta code đúng chuẩn, đúng format, tìm những lỗi linh tinh khi code. Còn thằng Prettier sẽ hỗ trợ bạn format code, sửa theo đúng chuẩn từ ESLint.
- Cài 2 thằng này xong, chỉ cần code đại rồi Ctrl S để save 1 phát là code vừa đẹp vừa chuẩn.

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

- Thằng này hỗ trợ pull/push từ Git, giúp biết từng dòng code do ai viết, viết vào lúc nào, nằm trong commit nào. Cũng có thể …. ngược về quá khứ để xem file đã thay đổi như thế nào...

[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
[Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

- Thằng này giúp ta khi code HTML/JSX, mỗi khi tạo thêm tag mới, extension sẽ đóng tag để khỏi quên. Khi đổi tên tag, extension này sẽ đổi tên closing tag cho phù hợp luôn.

[Auto Import](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

- Thằng này hỗ trợ mình Import thư viện JavaScript, component từ các file khác

[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

- Thằng này thêm vào cho đẹp dễ nhận ra các folder, file đặc biệt

[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

- Thằng này giúp gợi ý tên npm package, tên file trong thư mục khi mình cần import, giúp giảm lỗi khi import

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

- Thằng này giúp gợi kiểm tra lỗi chính tả.
