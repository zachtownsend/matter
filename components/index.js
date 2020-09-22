import Teaser from './Teaser';
import Feature from './Feature';
import Grid from './Grid';
import Placeholder from './Placeholder';
import HeroBlock from './HeroBlock';

const Components = {
    teaser: Teaser,
    feature: Feature,
    grid: Grid,
    heroBlock: HeroBlock
};

const Component = ({ blok }) => {
    if (typeof Components[blok.component] !== 'undefined') {
        const Component = Components[blok.component];
        return <Component blok={blok} />;
    }
    return <Placeholder componentName={blok.component} />;
};

export default Component;
