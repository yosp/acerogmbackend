import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";

import { ArrowBackIosRounded } from "@material-ui/icons";

import { GlobalContex } from "../../../context/GlobalState";
import {
  getGrupoInPtr,
  getGrupoNotInPtr,
  addGrupoMember,
  delGrupoMember
} from "../../../context/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
const GrupoPtr = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const Acerocontext = useContext(GlobalContex);
  const { setToggleAddGrupo, setToogleGrupo, GrupoPtrId, setUserRolList, setNotUserRolList} = Acerocontext;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleAllRight = () => {
    left.forEach(lef => {
      let perf = lef.split("-")[0]
      addGrupoMember({GrupoId: perf , PuestoTr: GrupoPtrId , CodigoEmp: 0}, (err, data) => {
        if(err) {

        } else {

        }
      })
      // AddUserRol({CodigoEmp:ActiveConfUser, RolId: ActiveRol, PerfId: perf}, (err, data) => {
      //   if(err) {

      //   } else {
      //     GetUserRolesList(ActiveConfUser, (err, data)=> {
      //       if(err) {
      
      //       } else {
      //         setUserRolList(data)
      //       }
      //     })
      //     GetRolNotUser(ActiveConfUser, (err, data) => {
      //       if(err) {
      
      //       } else {
      //         setNotUserRolList(data)
      //       }
      //     })
      //   }
      // })
    })

    setRight(right.concat(left));
    setLeft([]);
  };
  const handleCheckedRight = () => {
    leftChecked.forEach(lef => {
      let perf = lef.split("-")[0]
      addGrupoMember({GrupoId: perf , PuestoTr: GrupoPtrId , CodigoEmp: 0}, (err, data) => {
        if(err) {

        } else {
          
        }
      })
      // AddUserRol({CodigoEmp:ActiveConfUser, RolId: ActiveRol, PerfId: perf}, (err, data) => {
      //   if(err) {

      //   } else {
      //     GetUserRolesList(ActiveConfUser, (err, data)=> {
      //       if(err) {
      
      //       } else {
      //         setUserRolList(data)
      //       }
      //     })
      //     GetRolNotUser(ActiveConfUser, (err, data) => {
      //       if(err) {
      
      //       } else {
      //         setNotUserRolList(data)
      //       }
      //     })
      //   }
      // })
    })
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    rightChecked.forEach(lef => {
      let perf = lef.split("-")[0]
      delGrupoMember({GrupoId: perf , PuestoTr: GrupoPtrId , CodigoEmp: 0}, (err, data) => {
        if(err) {

        } else {
          
        }
      })
      // DelUserRol({CodigoEmp:ActiveConfUser, RolId: ActiveRol, PerfId: perf}, (err, data) => {
      //   if(err) {

      //   } else {
      //     GetUserRolesList(ActiveConfUser, (err, data)=> {
      //       if(err) {
      
      //       } else {
      //         setUserRolList(data)
      //       }
      //     })
      //     GetRolNotUser(ActiveConfUser, (err, data) => {
      //       if(err) {
      
      //       } else {
      //         setNotUserRolList(data)
      //       }
      //     })
      //   }
      // })
    })

    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleAllLeft = () => {
    right.forEach(lef => {
      let perf = lef.split("-")[0]
      delGrupoMember({GrupoId: perf , PuestoTr: GrupoPtrId , CodigoEmp: 0}, (err, data) => {
        if(err) {

        } else {
          
        }
      })
      // DelUserRol({CodigoEmp:ActiveConfUser, RolId: ActiveRol, PerfId: perf }, (err, data) => {
      //   if(err) {

      //   } else {
      //     GetUserRolesList(ActiveConfUser, (err, data)=> {
      //       if(err) {
      
      //       } else {
      //         setUserRolList(data)
      //       }
      //     })
      //     GetRolNotUser(ActiveConfUser, (err, data) => {
      //       if(err) {
      
      //       } else {
      //         setNotUserRolList(data)
      //       }
      //     })
      //   }
      // })
    })
    setLeft(left.concat(right));
    setRight([]);
  };
  useEffect(()=>{
    let perLeft = []
    let perRigt = []
    getGrupoInPtr(GrupoPtrId, (err, data) => {
      if(err) {

      } else {
        data.forEach(d => {
          perRigt.push(`${d.Id}-${d.grupo}`)
        })
        setRight(perRigt)
      }
    })

    getGrupoNotInPtr(GrupoPtrId, (err, data) => {
      if(err) {

      } else {
        data.forEach(d => {
          perLeft.push(`${d.Id}-${d.grupo}`)
        })
        setLeft(perLeft)
      }
    })

  },[])

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
      <Paper>
          <Typography variant="h4" component="h2">
            Grupos
          </Typography>
        <p>
          <Button onClick={(e)=>{ e.preventDefault()
                  setToogleGrupo(true)
                  setToggleAddGrupo(false)
                }}>
            <ArrowBackIosRounded/>
          </Button>
        </p>
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="Mover todo a la derecha"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="Mover seleccion a la derecha"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="Mover seleccion a la izquierda"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="Mover todo a la izquierda"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
    </Paper>
    </Grid>
  );
};

export default GrupoPtr;
