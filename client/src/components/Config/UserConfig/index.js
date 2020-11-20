import React, { useContext }  from 'react'
import LogoutPopup from '../../Util/LogoutPopup'

import SearchUser from './UserConfig'
import UserInfo from './UserInfo'
import UserSapInfo from './UserSapInfo'
import RoleTable from './RoleTable'
import UserRol from './UserRol'
import UserPerfil from './UserPerfil'
import UserPassword from './UserPassword'
import UserPuestoT from './UserPuestoT'

import { GlobalContex } from "../../../context/GlobalState";

const UserConfigBase = () => {
  const aceroContext = useContext(GlobalContex);
  const { UserSearch, UserSearchSap, TogglePerfil, ToggleRol, ToggleSapPass, TogglePuestoTr } = aceroContext

  let child 

  if(UserSearch != null) {
    if(ToggleRol){
      child = <>
      <UserInfo/>
      <UserRol/>
        </>
    }
    else if(TogglePerfil) {
      child = <>
      <UserInfo/>
      <UserPerfil/>
        </>
    } else if (TogglePuestoTr){
      child = <>
      <UserInfo/>
      <UserPuestoT/>
        </>
    }
    else {
      child = <>
      <UserInfo/>
      <RoleTable/>
        </>
    }
  } else if (UserSearchSap != null) {
    if(ToggleSapPass) {
      child = <>
                <UserSapInfo/>
                <UserPassword/>
      </>
    } else {
      child = <UserSapInfo/>
    }
  }

    return (
        <>
          <SearchUser/>
          {child}
          <LogoutPopup/>
        </>
    )
}

export default UserConfigBase
