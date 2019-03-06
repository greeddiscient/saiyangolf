
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

async function Drill(target) {
  await target.navigate('Drill', {})
}

async function DrillDetail(target, data) {
  await target.navigate('DrillDetail', {data: data})
}

async function NewDrillDetail(target, dataDetail, dataCompleted, dataAverage, data) {
  await target.navigate('NewDrillDetail', {
    dataDetail: dataDetail, 
    dataCompleted: dataCompleted, 
    dataAverage: dataAverage,
    data: data
  })
}


export default {
  focusNextField,
  Register,
  Login,
  Home,
  Drill,
  DrillDetail,
  NewDrillDetail
}
