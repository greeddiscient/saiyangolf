
//Fungsi
function focusNextField(target, nextField) {
  target.refs[nextField]._root.focus()
};

async function Register(target) {
  await target.navigate('Register', {})
}

async function Login(target) {
  await target.navigate('Login', {})
}

async function Home(target) {
  await target.navigate('Home', {})
}


export default {
  focusNextField,
  Register,
  Login,
  Home
}
