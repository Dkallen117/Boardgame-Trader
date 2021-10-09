import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Grid, Button } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_LISTING } from '../utils/queries';

import Auth from '../utils/auth';

const Listing = () => {
    const { listingId } = useParams();
    const { data, loading } = useQuery(QUERY_SINGLE_LISTING, {
        variables: { listingId }
    });
    const userData = Auth.getProfile();
    console.log('user data', userData)
    console.log('query data', data)
    console.log(data?.listing.seller.username, userData.data.username)
    return(
        <React.Fragment>
            { loading ? (
                <h1>Loading...</h1>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>{data.listing.title}</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={data.listing.img} alt="game" style={{maxWidth: '100%'}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                { data.listing.seller.username === userData.data.username ? (
                                    <Grid item xs={12}>
                                        <Button variant='contained' fullWidth style={{marginBottom: "1%"}}>Edit</Button>
                                        <Button variant='contained' fullWidth>Delete</Button>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Button variant='contained' fullWidth style={{marginBottom: "1%"}}>Save for Later</Button>
                                        <Button variant='contained' fullWidth>Contact Seller</Button>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <p>
                                        {data.listing.description}
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p>
                                        Price: {data.listing.price}
                                    </p>
                                    <p>
                                        Quantity: {data.listing.quantity}
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p>
                                        Genre: {data.listing.genre}
                                    </p>
                                    <p>
                                        Seller: {data.listing.seller.username}
                                    </p>
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