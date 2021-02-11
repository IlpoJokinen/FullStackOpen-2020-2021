import React from 'react';
import { Icon } from 'semantic-ui-react';

const GenderIcon: React.FC<{ gender: string | undefined }> = ({ gender }): JSX.Element | null => {
    switch (gender) {
        case "male":
            return <Icon name='mars' size='large' />;
        case "female":
            return <Icon name='venus' size='large' />;
        case "other":
            return <Icon name='genderless' size='large' />;
        default:
            return null;
    };
};

export default GenderIcon;