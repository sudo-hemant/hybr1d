import LazyLoad from "./LazyLoad";

export const Home = LazyLoad(() => import("../home"));
export const ItemDetail = LazyLoad(() => import("../itemDetail"));
