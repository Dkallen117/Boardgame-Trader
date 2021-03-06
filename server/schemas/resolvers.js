const { AuthenticationError } = require('apollo-server-express');
const { User, Listing } = require('../models');
const { signToken } = require('../utils/auth');
const { PubSub } = require("graphql-subscriptions");

const messages = [];
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('listings').populate('favorites');
    },
    listings: async () => {
      return Listing.find().populate('seller');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    listing: async(parent, { listingId }) => {
      return Listing.findOne({_id: listingId}).populate('seller');
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('listings').populate('favorites');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    messages: async () => messages, //returns messages
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email: email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addListing: async (parent, { listing }, { user }) => {
      // check for the user data to confirm logged in
      if(user){
        // create the new listing
        const newListing = await Listing.create({
          ...listing,
          seller: user._id
        });
        // add the listing ID to the user's data
        await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { listings: newListing._id } }
        );
        return newListing;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeListing: async (parent, { listingId }, { user }) => {
      // check for the user data to confirm logged in
      if(user){
        // remove the listing, matching the id and the seller id
        await Listing.findOneAndDelete({ 
          _id: listingId,
          seller: user._id
        });
        // remove the listing ID from the user's data
        const updatedList = await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { listings: listingId } },
          { new: true },
        );
        return updatedList;
      }
      
      throw new AuthenticationError('You need to be logged in!');
    },
    editListing: async (parent, {listingId, listingInput}, { user }) => {
      return Listing.findOneAndUpdate(
        { _id: listingId, seller: user._id },
        { ...listingInput },
        { new: true },
      )
    },
    addFavorite: async (parent, { listingId }, { user }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { favorites: listingId } },
        { new: true },
      );
    },
    removeFavorite: async (parent, { listingId }, { user }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $push: { favorites: listingId } },
        { new: true },
      );
    },
    // Set up mutation so a logged in user can only remove their user and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    postMessage: (parent, { username, text }) => {
      const id = messages.length;
      messages.push({
        _id,
        username,
        text,
      });
      subscribers.forEach((fn) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

module.exports = resolvers;
