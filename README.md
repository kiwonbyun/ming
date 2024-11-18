[![Video Title](https://img.youtube.com/vi/iL7ieOhwslM/0.jpg)](https://www.youtube.com/watch?v=iL7ieOhwslM)

- 💻 [Demo Page](http://b-origin-ming.s3-website.ap-northeast-2.amazonaws.com/)
- 📚 [Github Profile](https://github.com/kiwonbyun)

# @b-origin/ming-modal

A React modal component library.

## Installation

```bash
npm install @b-origin/ming-modal
# or
yarn add @b-origin/ming-modal
# or
pnpm add @b-origin/ming-modal
```

## Usage

```jsx
import { ModalRoot, Modal } from "@b-origin/ming-modal";

function App() {
  return (
    <div>
      <ModalRoot dimAutoClose={true} />
      <Modal>
        <Modal.Content>
          <Modal.Close>close</Modal.Close>
          <Modal.Submit>submit</Modal.Submit>
        </Modal.Content>
      </Modal>
    </div>
  );
}
```

# @b-origin/ming-toast

A React toast component library.

## Installation

```bash
npm install @b-origin/ming-toast
# or
yarn add @b-origin/ming-toast
# or
pnpm add @b-origin/ming-toast
```

## Usage

```jsx
import { Toaster, toast } from "@b-origin/ming-toast";

function App() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <button onClick={() => toast("hello ming-toast")}>toast</button>
    </div>
  );
}
```

## License

MIT
