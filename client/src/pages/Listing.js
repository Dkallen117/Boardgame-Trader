import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_LISTING } from '../utils/queries';
import { ADD_FAVORITE, REMOVE_LISTING } from '../utils/mutations';

import Auth from '../utils/auth';
import { Local } from '../utils/local';

const Listing = () => {
    const { listingId } = useParams();
    const userData = Auth.getProfile();
    let favorited = Local.getFavorites().includes(listingId) || false

    const [ dataState, setDataState ] = useState({
        title: '',
        description: '',
        quantity: '',
        price: '',
        genre: '',
        img: '',
        seller: {},
        favorited: favorited,
    });

    const { data, loading } = useQuery(QUERY_SINGLE_LISTING, {
        variables: { listingId },
        onCompleted: () => {
            setDataState({
                ...dataState,
                title: data.listing.title,
                description: data.listing.description,
                quantity: data.listing.quantity,
                price: parseFloat(data.listing.price).toFixed(2),
                genre: data.listing.genre,
                img: data.listing.img,
                seller: data.listing.seller,
            })
        }
    });

    const [saveFavorite, favMutation] = useMutation(ADD_FAVORITE, {
        variables: { listingId }
    });
    const [deleteListing, deleteMutation] = useMutation(REMOVE_LISTING, {
        variables: { listingId }
    });

    const handleSaveFavorite = async () => {
        try {
            await saveFavorite();
            Local.addFavorite(listingId);
            setDataState({
                ...dataState,
                favorited: true,
            });
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async () => {
        try {
            if(window.confirm(`Are you sure you want to delete your "${dataState.title}" listing?`)) {
                await deleteListing();
                alert('Listing deleted!');
                window.location.assign('/profile');
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    return(
        <React.Fragment>
            { loading ? (
                <h1>Loading...</h1>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>{dataState.title}</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={dataState.img} alt="game" style={{maxWidth: '100%'}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                { dataState.seller.username === userData.data.username ? (
                                    <Grid item xs={12}>
                                        <Button
                                            variant='contained' 
                                            fullWidth
                                            href={`/edit/${listingId}`}
                                            style={{marginBottom: "1%"}}
                                        >Edit</Button>
                                        <Button 
                                            variant='contained' 
                                            fullWidth
                                            onClick={handleDelete}
                                        >Delete</Button>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Button
                                            disabled={dataState.favorited}
                                            variant='contained' 
                                            fullWidth 
                                            style={{marginBottom: "1%"}}
                                            onClick={handleSaveFavorite}
                                        >{!favorited ? 'Save for Later' : 'Saved!'}</Button>
                                        <Button variant='contained' fullWidth>Contact Seller</Button>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <p>
                                        {dataState.description}
                                    </p>
                                </Grid>
                                <Grid item xs={6}>
                                    Price: $ {dataState.price}
                                </Grid>
                                <Grid item xs={6}>
                                    Quantity: {dataState.quantity}
                                </Grid>
                                <Grid item xs={6}>
                                    Genre: {dataState.genre}
                                </Grid>
                                <Grid item xs={6}>
                                    Seller: {dataState.seller.username}
                                </Grid>
                                <Grid item xs={6}>
                                    Contact: {dataState.seller.email}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </React.Fragment>
    )
}

export default Listing;