import icons from './../../assets/Sprite.svg'


export const Icon = (props: any) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`${icons}#${props.iconId}`}/>
        </svg>

    );
};

