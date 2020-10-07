import React from 'react';

import Highlighter from "react-highlight-words";

import ItemSearchAPI from "./model/ItemSearchAPI.js";

//import {loadProduceData} from "./loadData.js";



// Comound component context
const ItemViewerContext = React.createContext();

const useItemViewerContext = () => {
  const context = React.useContext(ItemViewerContext);
  if (!context) {
    throw new Error(
      `ItemViewer compound components cannot be rendered outside the ItemViewer component`
    );
  }
  return context;
};

// Input and Button Component

const ItemInput = ({ children, ...props }) => {
  const context = useItemViewerContext();
  const inputEle = React.useRef(null);

  const [opacity, setOpacity] = React.useState(1)

  const onSearchClick = () => {
    context.searchWordFunc(inputEle.current.value);
  }

  const buttonHover = () => {
    setOpacity(.6)
  }

  const buttonLeaveHover = () => {
    setOpacity(1)
  }

  const enterPressed = (event) => {
    if(event.key === 'Enter'){
      onSearchClick()
    }
  }
 
  return (<div style={{position:"absolute", padding: "5px", float: "left", zIndex: "100", top: "0px"}}>
      <input ref={inputEle} type="text" onKeyPress={(event) => {enterPressed(event)}} style={{position: "absolute", background: "transparent", border: "2px solid white", fontSize: "30px", padding: "10px", color: "white", borderRadius: "5px"}}/>
      <button onMouseEnter={() => {buttonHover()}} onMouseLeave={() => {buttonLeaveHover()}} onClick={onSearchClick} style={{position: "absolute", left: "338px", backgroundColor: "#BBC702", border: "2px solid white", width: "80px", height: "58px", opacity: opacity, borderRadius: "5px", color: "white", fontSize: "20px"}}>Search</button>
    </div>
  );
}



// Displays data 

const ItemDisplay = ({ children, ...props }) => {
  const context = useItemViewerContext()



  return (
    <div>
      {context.selectedItemState.state.length > 0 && 
        <div style={{display: "flex", flexDirection: "row", position: "absolute", top: "110px", flexWrap: "wrap", justifyContent: "center"}}>
          {context.selectedItemState.state.map( item => (
            <div>
              <div style={{ width: "400px", height: "200px", border: "2px solid white", borderRadius: "5px", position: "relative", margin: "10px" }}>
                <div style={{padding: "15px", position: "absolute", width: "100%", height: "100%", zIndex: "1", fontFamily: "Arial", color: "white"}}>
                  
                  <div style={{fontSize: "20px", textDecoration: "underline"}}>
                    { item.title && <Highlighter 
                      searchWords={[context.searchWord]}
                      autoEscape={true}
                      textToHighlight={item.title}
                      highlightStyle={{color: "red", backgroundColor: "transparent"}}
                    />}

                  </div>
                  
                  { item.img ? <img src={item.img} style={{width: "100px", height:"100px", float: "right", border: "1px solid white", marginRight: "30px", marginLeft: "10px"}}/> 
                    : 
                    <div style={{width: "100px", height:"100px", float: "right", border: "1px solid white", marginRight: "30px", marginLeft: "10px"}}>
                      No Image To Display
                    </div>
                  }
                  {item.description && <Highlighter
                    searchWords={[context.searchWord]}
                    autoEscape={true}
                    textToHighlight={item.description}
                    highlightStyle={{color: "red", backgroundColor: "transparent"}}
                  />}
                  { item.categories && item.categories.length > 0 &&
                    <div>
                      <br />
                      Key Words: &nbsp;
                      <Highlighter
                        searchWords={[context.searchWord]}
                        autoEscape={true}
                        textToHighlight={
                          item.categories.map(x => x.name).join(", ")
                        }
                        highlightStyle={{color: "red", backgroundColor: "transparent"}}
                      />
                      
                    </div>
                  }
                  { item.subcategories && item.subcategories.length > 0 && 
                    <div>
                      <br />
                      Subcategories: &nbsp;
                      <Highlighter
                        searchWords={[context.searchWord]}
                        autoEscape={true}
                        textToHighlight={
                          item.subcategories.join(", ")
                        }
                        highlightStyle={{color: "red", backgroundColor: "transparent"}}
                      />
                    </div>
                  }
                </div>


                <div style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "#BBC702", opacity: ".6", zIndex: "0"}} />
              </div>
            </div>

          ))}
        </div>
      }
    </div>
  );
}

// Parent of compound component

export default function ItemViewer() {

  const itemSearchAPI = new ItemSearchAPI()

  
  const [itemArray, setItemArray] = React.useState([]);
  const [word, setWord] = React.useState("");


  const searchWord = (userWord) => {
    if (userWord !== "") {
      var searchItems = itemSearchAPI.searchWithWord(userWord);
      setItemArray(searchItems);
      setWord(userWord);
    }
  }


  return (
    <ItemViewerContext.Provider value={{
      searchWord: word,
      searchWordFunc: searchWord,
      selectedItemState: {
        state: itemArray, 
        func: setItemArray
      }
    }} >
      <ItemViewer.ItemInput />
      <ItemViewer.ItemDisplay />
    </ItemViewerContext.Provider>
  );
}


ItemViewer.ItemInput = ItemInput;
ItemViewer.ItemDisplay = ItemDisplay;

















