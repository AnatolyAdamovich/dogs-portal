import React, {useContext, useEffect, useState} from 'react';
import Like from "../LikeIcon/Like";

import {PostNewLike} from "../../../api/POST";
import {GetDoesUserLikeBreedId} from "../../../api/GET";
import {useAuth0} from "@auth0/auth0-react";
import {AuthContext} from "../../../helpers/authContext";

const BreedCard = ({title, content, image, id, likesCount}) => {
    const {getAccessTokenSilently} = useAuth0()
    const {authState} = useContext(AuthContext)
    const [like, setLike]=useState(false)
    // ставил ли пользователь лайк на эту запись?
    const CheckLike = async ()=>{
        try{
            console.log(authState.id)
            const userId = authState.id
            await GetDoesUserLikeBreedId(setLike, id, userId)
        }catch(e){
            console.log('Пользователь не авторизован')
        }
    }

    useEffect(CheckLike,[])

    const likeBreed = async ()=> {
        try{
            const token = await getAccessTokenSilently()
            await PostNewLike(id, token)
        }catch(e){
            console.log('Пользователь не авторизован')
        }
    }

    return (
        <div className="card border-dark mt-5" style={{"width": "70%", "height":"500px", "marginLeft": "15%", "borderRadius": "20px"}}>
            <div className="card-body row">
                <div className="col-md-6">
                    <img src={`http://localhost:4000/${image}`}
                         className="img-thumbnail" alt="*картинка*"
                         style={{'width': '100%', 'height': '80%', "maxHeight":"420px","border-radius": "20px"}}
                    />
                    <div onClick={likeBreed}> <Like like={like} setLike={setLike}/> </div>
                </div>
                <div className="col-md-6">
                    <div style={{"border":"20px","borderColor": "black","borderRadius": "20px", "background":"#FBC940"}}>
                        <h5 className="card-title text-center">{title}</h5>
                    </div>
                    <p className="card-text ">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default BreedCard;