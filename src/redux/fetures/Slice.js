import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "App",

  initialState: {
    signupform: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
    },

    dataType: {
      type: "",
    },

    item:{
      type:"",
    },

    carddata:{
      title:"",
      type:"",
      link:"",
      discription:""
    }
  },

  reducers: {
   Setsignupform: (state, action) => {
  state.signupform = {
    ...state.signupform,
    ...action.payload,
  };
},

    SetDataType: (state, action) => {
      state.dataType.type = action.payload;
    },
    SetItem:(state,action)=>{
      state.item.type=action.payload
    },
  Setcarddata: (state, action) => {
  state.carddata = {
    ...state.carddata,
    ...action.payload,
  };
},
  },
});

export const { Setsignupform, SetDataType, SetItem, Setcarddata } = Slice.actions;
export default Slice.reducer;
