declare module "*.png"
declare module "*.svg"
declare module "*.jpg"

type TransitionFuncType = (link: string) => void
type MouseXYType = [number | null, number | null]
type WindowSizeType = [number, number]
interface LocationState {
    pathname: string;
}
type PointType = {
    x: number
    y: number
    vX: number
    vY: number
    r: number
    target: [number, number] | 'none'
}