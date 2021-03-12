import React from 'react';
import ReactDom from 'react-dom';
import {isMobile} from 'react-device-detect';
import SDC from '../../../images/SDC.gif';
// import SDC from '../../../images/SDC-with-config.JPG';
// import twong from '../../../images/twong-demo2.png';
import SJSURA from '../../../images/stress-strain-overall.jpg';
import ReactPlayer from 'react-player/lazy';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
  },
  suggestionModal: {
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%)',
      marginLeft: -257.5,
      backgroundColor: '#FFF',
      height: '90vh',
      width: 755,
      overflowY: 'scroll',
      padding: 50,
      zIndex: 1000
    },
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFF',
      height: '90vh',
      width: 755,
      overflowY: 'scroll',
      padding: 50,
      zIndex: 1000
    }
  },
  video:{
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  img: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 640,
    height: 'auto'
  },
  MobileSuggestionsModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    height: '90vh',
    width: '90vw',
    overflowY: 'scroll',
    padding: 50,
    zIndex: 1000
  },
  mobileImg: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '75vw',
    height: 'auto'
  },
}));

const Modal = ({ proj, close }) => {

  const classes = useStyles();
  const theme = useTheme();

  let url;
  let title;
  let description;
  let img;

  switch (proj) {
    case 'FEC':
      url = 'https://youtu.be/Slfge4xx5Yg';
      img = ''
      title = 'Recreational Engineer Inc.';
      description = `This is a demo of a full stack single page online retail web application I built using React, Express, NodeJS and MySQL. \nI developed an image display module that dynamically renders an image preview bar and color swatch panel based on information from the database. Pressing the buttons on the color swatch panel would change the set of images in the preview bar and clicking the images in the image preview bar would change the main image. \nWhen the cursor hovers over the main image, a module pops up displaying a zoomed in version of the main image to let users examines the merchandise in detail.`;
      break;
    case 'SDC':
        url = '';
        img = SDC;
        title = 'Scaling Simplified';
        description = 'lol'
        // description = `For this project, I redesigned the backend of an online shoe retailer. The component I inherted is an image carousel that displays 16 recommendations per product. My challenge is to scale the micro-service to handle 10 M records while ensuring great user experience. \nUsing New Relic and stress testing with K6, I identified that this application's bottleneck was the database's long query time. \nTo redesign the database, I developed a PostgreSQL schema with two tables; a products table containing the product details, and a suggestions table with two foreign key references referncing the id from the products table. By implenenting indexing, I achieved an average query time of 30 ms. \nTo further improve the efficiency of this application, I explored the viability of using arrays in my PostgreSQL schema. The new schema is similar to the first but instead of having a suggestions column referencing the product ID, there would be an array of suggestion IDs. My rationale is that my original schema design with indexing would have a logarithmic lookup whereas this new design would have a constant lookup given that I would use a primary key to search for the suggestions array which contains the primary key of the recommended. Implementing this new design improved the micro-service’s average query time by 87% from 30 ms to 4 ms, and its database storage size by 68%, from 8.8 GB to 2.8 GB. \nAfter optimizing the database, my bottleneck became the server. At high traffic, the server would be unable to keep up with the requests, which would result in high latency and error. To address this issue, I horizontally scaled the microservice to 5 AWS instances and implemented NGINX load balancing with a least connection configuration. Ultimately, I was able to reduce latency from 3000 ms to 150 ms at 5000 users per minute.`;
        break;
    case 'MVP':
      url = 'https://youtu.be/1RhqFDyf3DU';
      img = ''
      title = 'Joey not Joey';
      description = "This is a demo of Joey not Joey, a mobile quiz game that is built with React Native, Django, and SQLite. This game was inspired by my dog Joey. I had recently found a doppelganger of my dog online and I thought this would be a fun project to do to see if people can differentiate Joey from his doppelganger. \nThis game has two game modes: a single player mode and an online multiplayer mode. \nThe single player mode allows users to play through a quiz. For each question, the player is given 20 seconds to select an answer. The player is also given 3 lifelines: 50/50, skip and reset timer, which can each be used once during the game. After using the lifeline, the button will become disabled. When the game finishes, it will take you to a game over page. It fetches a the top 10 high scores from the database. If the player scores higher than the 10th highest score, it would prompt the player to enter his/her name and add the score to the high score database. In the case where score is equal, the high score ranking would be determined by least time taken to complete quiz. \nThe multiplayer mode utilizes WebSocket (Django Channels) to maintain real time connectivity between two devices. Player one initiates a game by pressing create room which triggers the server to generate and return a unique game code. Player two joins a room by pressing join room which prompts a text input. on Submit, the client sends the submitted code to the server which checks if code is valid and if the player two slot is open. If everything is valid, it prompts you to start the game. player one cannot start game until player two joins the game. \nOnce both players join a room, they are connected via WebSocket and a turn based game is initialized. The game starts with player one. After each player completes 5 questions, it will send an updated score to the server and trigger the other player's turn. This will repeat until 4 rounds are complete and a game over page will be triggered indicating which player won.";
      break;
    case 'twong':
        url = '';
        img = twong;
        title = 'Personal Portfolio Site';
        description = "This is my personal portfolio site. It is created using React and Material-UI and hosted on Heroku. \nThis website is created with responsive UI design. It is capable of autmatically adapting to users' window space, allowing this website to have content consistency across most devices. This website  \nTry this feature out by adjusting your browser's window size!";
        break;
    case 'RRStore':
      url = 'https://youtu.be/nM_XZsP1aJI';
      img = '';
      title = 'React/Redux Generic Store';
      description = "This is a demo of a frontend online retail web application I built using React, Redux, Express, and Firebase. \nThis application utilizes Firebase for authentication. Users can sign up using their emails, log into their accounts using their email or log in using their Google accounts.\nAfter logging in, the page will display all the merchandises.  Users can filter products by categories through the navigation bar or search for specific items. For each item, users can click on 'see details' which would trigger a pop up modal displaying the product's description. Users can then press 'add to cart' to add product to cart or click anywhere to exit the modal. \nAfter products are added to the cart, users can then continue to checkout where they will be shown their order summary followed by forms that ask for the user's address and credit card information. On submission, forms will be validated to ensure the required fields are completed. After purchase is complete, users can return to the main merchandise page or log out. \nIn this application, Redux is used to store global states such as the products, firebase authentication info, cart and subtotal. React Hooks are used to store local states.";
      break;
    case 'SJSU-RA':
      url = '';
      img = SJSURA;
      title = 'Characterizing Ductile Materials using Regression Analysis';
      description = `This program was developed as part of my master's project at SJSU. The objective of my project is to examine how aluminum profiles (Al 6061-T6) deformed upon impact to study how the material can be incorporated to automotive use to make vehicles more energy efficient and safe. \nIn order to create a simulation model, I needed to determine a mathematical way to depict how aluminum deforms when impacted on. Given empirical test data, I developed a program that utilized a machine learning concept known as regression analysis to reverse engineer the material constants via the gradient descent method. \nThis program calculates the parameters that best fit the data and returns a graph depicting empirical and best fit data. This program can be used to reverse engineer the material constants of any ductile material.`
      break;
  }

  if (isMobile) {
    return ReactDom.createPortal(
      <div className={classes.overlay}>
        <div className={classes.MobileSuggestionModal} >
        <CloseIcon onClick={() => {close()}} style={{cursor: 'pointer'}}/>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <img src={img} className={classes.mobileImg}/>
          </div>
          <h2>{title}</h2>
          <p><strong>Project Details: </strong>{description.split('\n').map(str => (<p>{str}</p>))}</p>
        </div>
      </div>,
      document.getElementById('modal')
    );
  } else {
    return ReactDom.createPortal(
      <div className={classes.overlay}>
        <div className={classes.suggestionModal} >
        <CloseIcon onClick={() => {close()}} style={{cursor: 'pointer'}}/>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {url ? <div className={classes.video}><ReactPlayer url={url} /></div>: <img src={img} className={classes.img}/>}
          </div>
          <h2>{title}</h2>
          <p><strong>Project Details: </strong>{description.split('\n').map(str => (<p>{str}</p>))}</p>
        </div>
      </div>,
      document.getElementById('modal')
    );
  }
};

export default Modal;