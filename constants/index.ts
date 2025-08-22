export interface BlogsType{
    id:string;
    title:string;
    description:string;
    image:string;
    active:boolean;
}

export const Blogs:BlogsType[]=[
    {
        id:"1",
        title:"Blog 1",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit",
        image:"/images/hero1.jpg",
        active:true
    },
    {
        id:"2",
        title:"Blog 2",
        description:"dolor sit amet consectetur adipisicing elit",
        image:"/images/hero2.jpg",
        active:true
    },
    {
        id:"3",
        title:"Blog 3",
        description:" dolor sit amet consectetur adipisicing elit",
        image:"/images/hero3.jpg",
        active:true
    },
    {
        id:"4",
        title:"Blog 4",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit",
        image:"/images/hero4.jpg",
        active:true
    },
    {
        id:"5",
        title:"Blog 5",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit",
        image:"/images/product-1.jpg",
        active:true
    },
]