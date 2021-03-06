import axios from "axios";
const backendPath = "//localhost:4000";


/*-----------------------------------------------------------------------*/
/*------------------------Join----------------------------------------*/

//Запрос на регистрацию пользователя на сайте
export const PostRegistration = async (data, setAuth)=>{

    await axios.post(`http:${backendPath}/join/registration`, data).then((response)=>{
        if (response.data.error){
            alert(response.data.error);
        }else{
            localStorage.setItem("accessToken", response.data.token);
            setAuth({
                id: response.data.id,
                role: response.data.role,
                statusOfAuth: true
            })
            alert(response.data.message)
        }
    })
}

//Запрос на проверку пароля пользователя и дать ему возможность авторизироваться
export const PostLogin = async (data, setAuth)=>{
    await axios.post(`http:${backendPath}/join/login`, data).then((response)=>{
        if (response.data.error) {
            alert (response.data.error)
        }
        else{
            localStorage.setItem("accessToken", response.data.token);
            setAuth({
                id: response.data.id,
                role: response.data.role,
                statusOfAuth: true
            })
            alert(response.data.message);
        }
    });
}


/*-----------------------------------------------------------------------*/
/*------------------------Public----------------------------------------*/

//Запрос на создание новой карточки породы
export const PostNewBreed = async (data, token) =>{
    await axios.post(`http:${backendPath}/public/create`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.error) alert(response.data.error)
        else alert(response.data);
    });
}

// Поставить лайк или убрать лайк породе (только авторизованные пользователи)
export const PostNewLike = async (BreedId, token) => {
    try{
        await axios.post(`http:${backendPath}/public/like`, {BreedId: BreedId}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            console.log(response.data)
        })
    }catch(e){
        alert('Возникла ошибка')
    }
}

// Поиск породы по названию
export const SearchBreed = async (setObject, BreedName, setTotalPage, limit)=>{
    try{
        await axios.post(`http:${backendPath}/public/search`, {BreedName: BreedName}).then((response) => {
            if (!response.data.error) {
                setObject(response.data);
                setTotalPage(Math.ceil(response.data.length/limit))
            }else{
                alert(response.data.error);
            }
        });
    }catch(e){
        alert('Возникла ошибка')
    }
}

/*-----------------------------------------------------------------------*/
/*------------------------Private----------------------------------------*/


// Запрос на создание новой карточки пользователя
export const PostNewCard = (data, token) =>{
    axios.post(`http:${backendPath}/private/create`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.error) alert(response.data.error)
        else alert(response.data);
    });
}