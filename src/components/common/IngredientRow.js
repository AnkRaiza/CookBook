import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {TextInput} from './TextInput';
import styles from '../../styles/styles.css';

export const IngredientRow = ({ingredient, position, onChange, onRemove}) => {
    return (
        <div>
            <input className={styles.half_width} type="text"
                data-position={position}
                name="ingredient"
                value={ingredient.name}
                onChange={onChange}/>
            <input className={styles.half_width} type="text"
                data-position={position}
                name="ammount"
                value={ingredient.ammount}
                onChange={onChange}/>
            <input className="btn-floating btn-small waves-effect waves-light red" type="button"
                data-position={position}
                name="remove"
                value="X"
                onClick={onRemove}
                />
        </div>
    );
};

IngredientRow.propTypes = {
    ingredient: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};