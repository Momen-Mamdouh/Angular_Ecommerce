import { IconDefinition } from "@fortawesome/angular-fontawesome"

export interface IMegaMenuItem{
    itemName:string,
    routerLink:string,
}
  
export interface IMegaMenuData{
    menuName: string,
    subMenuName:string,
    itemsName:string,
    subItemsName:string,
    subItemName:string,
    subItemAnchorName:string,
    itemsNames:IMegaMenuItem[],
    routerLink:string,
    subItemsNames: IMegaMenuItem[],
}


export interface INavbarIconsData{
    icon:IconDefinition,
    iconInTag:string,
    iconHoverClass:string,

}
