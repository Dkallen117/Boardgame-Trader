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
    console.log('this is the data', data)
    return(
        <React.Fragment>
            { loading ? (
                <h1>Loading...</h1>
                ) : (
                    <Grid container>
                        <Grid item xs={12}>
                            <h1>{data.listing.title}</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={data.listing.img} alt="game" style={{maxWidth: '100%'}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Container>
                                <Button variant='contained'>Save for Later</Button>
                                <Button variant='contained'>Contact Seller</Button>
                                <Button variant='contained'>Edit</Button>
                                <Button variant='contained'>Delete</Button>
                                <p>
                                    {data.listing.description}
                                </p>
                                <p>
                                    Price: {data.listing.price}
                                </p>
                                <p>
                                    Quantity: {data.listing.quantity}
                                </p>
                                <p>
                                    Genre: {data.listing.genre}
                                </p>
                            </Container>
                        </Grid>
                    </Grid>
                )
            }
        </React.Fragment>
    )
}

export default Listing;