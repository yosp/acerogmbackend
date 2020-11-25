import React, { useContext } from "react";

import GrupoHeader from "./GrupoHeader";
import PuestoTrTable from './PuestoTrTable'
import GruposTable from './GruposTable'
import GrupoPtr from './GrupoPtr'
import GrupoUserConfig from './GrupoUserConfig'
import GrupoUserInfo from './GrupoUserInfo'
import MemberTable from './MemberTable'

import { GlobalContex } from "../../../context/GlobalState";
const ConfigGrupoBase = () => {
  const aceroContext = useContext(GlobalContex);
  const {ToggleGrupo, ToggleAddGrupo, ToggleAddMember, ToggleMemberList } = aceroContext

  let child = <div></div>

  if(ToggleGrupo) {
    child = <div><GruposTable/></div>
  } else if(ToggleAddGrupo) {
    child = <div><GrupoPtr/></div>
  } else if(ToggleAddMember){
    child = <div>
              <GrupoUserConfig/>
              <GrupoUserInfo/>
            </div>
  } else if(ToggleMemberList) {
    child = <div>
              <MemberTable/>
          </div>
  }
  else {
    child = <div><PuestoTrTable/></div>
  }

  return (
    <>
      <GrupoHeader />
      {child}
    </>
  );
};

export default ConfigGrupoBase;
