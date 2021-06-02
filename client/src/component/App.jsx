import React, { useRef, useEffect, useState } from "react";
import {isMobileOnly, mobileVendor} from 'react-device-detect';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import profile from '../../../images/profile.png';
import main_img from '../../../images/main.jpg';
import FEC from '../../../images/FEC.png';
import generic_store from '../../../images/react-redux-store.png';
import SDC from '../../../images/SDC-close-up.JPG';
import MVP from '../../../images/MVP.png';
import stressStrain from '../../../images/stress-strain.JPG';
import twong from '../../../images/twong.png';
import Modal from './modal.jsx';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const drawerWidth = 240;

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      marginLeft: 80,
      marginRight: 80
    },
  },
  divider: {
    background: '#353D47',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: '#022145',
    overflow: 'hidden',
    color: '#F3F1F0',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navbarButton: {
    color: '#F3F1F0',
    background: '#022145',
  },
  navbarButtonActive: {
    color: '#022145',
    background: '#F3F1F0',
    "&:hover": {
      color: '#022145',
      background: '#F3F1F0',
    }
  },
  navbarText: {
    textAlign: 'center'
  },
  closeButton: {
    margin: theme.spacing(1),
    color: '#F3F1F0'
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  profile: {
    width: 180,
    height: 180,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#022145',
    overflow: 'hidden'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  socialMedia: {
    textAlign: 'center'
  },
  card: {
    // minWidth: 300,
    // maxWidth: 350,
    // width: 350,
    margin: 20
  },
  media: {
    height: 300,
  },
}));

const  App = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState('about');
  const [showModal, setShowModal] = useState(false);
  const [projDetails, setDetails] = useState('FEC');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
//c
  const sectionRefs = [
    { section: "about", ref: aboutRef },
    { section: "projects", ref: projectsRef },
    { section: "resume", ref: resumeRef },
    { section: "contact", ref: contactRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current) || 0;
      const scrollPosition = window.scrollY + headerHeight + 300;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        setVisibleSection('contact');
      } else if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  const openProject = e => {
    setDetails(e.target.id);
    setShowModal(true);
  };

  const clickOutModal = e => {
    if (showModal) {
      setShowModal(false);
    }
  };

  const drawer = (
    <div>
      { mobileOpen ?
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton> : <div className={classes.toolbar} /> }
      <div className={classes.profileContainer}>
        <img src={profile}  className={classes.profile}/>
      </div>
      <div
        style={{height: '40px'}}
        // className={classes.toolbar}
      />
      <List>
        <Divider className={classes.divider}/>
        <ListItem
          button
          key={'About'}
          className={visibleSection === 'about' ? classes.navbarButtonActive : classes.navbarButton}
          onClick={() => {
            scrollTo(aboutRef.current);
          }}
          >
          <ListItemText className={classes.navbarText} primary={'About'} />
        </ListItem>
        <Divider className={classes.divider}/>
        <ListItem
          button
          key={'Projects'}
          className={visibleSection === 'projects' ? classes.navbarButtonActive : classes.navbarButton}
          onClick={() => {
            scrollTo(projectsRef.current);
          }}
          >
          <ListItemText className={classes.navbarText} primary={'Projects'} />
        </ListItem>
        <Divider className={classes.divider}/>
        <ListItem
          button
          key={'Resume'}
          className={visibleSection === 'resume' ? classes.navbarButtonActive : classes.navbarButton}
          onClick={() => {
            scrollTo(resumeRef.current);
          }}
          >
          <ListItemText className={classes.navbarText} primary={'Resume'} />
        </ListItem>
        <Divider className={classes.divider}/>
        <ListItem
          button
          key={'Contact'}
          className={visibleSection === 'contact' ? classes.navbarButtonActive : classes.navbarButton}
          onClick={() => {
            scrollTo(contactRef.current);
          }}
          >
          <ListItemText className={classes.navbarText} primary={'Contact'} />
        </ListItem>
        <Divider className={classes.divider}/>
      </List>
      <div className={classes.socialMedia}>
      <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={classes.closeButton}
          onClick={()=>{window.location.href = 'mailto:terrencew07@ucla.edu'}}
      >
          <EmailIcon />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        className={classes.closeButton}
        onClick={()=>{window.open('https://linkedin.com/in/terrence-wong', '_blank')}}
      >
        <LinkedInIcon />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        className={classes.closeButton}
        onClick={()=>{window.open('https://github.com/twong0088', '_blank')}}
      >
        <GitHubIcon />
      </IconButton>
      </div>
    </div>
  );

  const container = props.window !== undefined ? () => window().document.body : undefined;

  return (
    <div
      className={classes.root}
      onClick={clickOutModal}
      style={showModal ? {overflow: 'hidden'} : null}
    >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" noWrap ref={headerRef}>
            Terrence Wong
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Hidden mdUp>
          <div className={classes.toolbar} />
        </Hidden>
        <div ref={aboutRef}>
          <Hidden smDown>
            <h1>Terrence Wong</h1>
          </Hidden>
          <Hidden mdUp>
            <h1>About</h1>
          </Hidden>
          <Hidden xsDown>
            <div id='about' style={{display: 'flex', flexDirection: 'row'}}>
              <p style={{marginRight: 30, fontSize: 'medium', marginTop: 0}}>
                Hello and welcome to my website! <br /><br />
                My name is Terrence, I am a software Engineer experienced with JavaScript, React, React Native, Node.JS, SQL/NoSQL and more. <br /><br />

                Prior to software engineering, my background was in Mechanical and Materials Engineering. I've long been passionate about engineering because it combines critical thinking and problem solving in order to create exciting innovations. I fell in love with software engineering during my Master's program after writing a machine learning algorithm to reverse engineer the material properties of aluminum profiles. By incorporating computer programming to my research, I was able to produce results that were far more accurate than what I had expected. Software engineering really excites me because it encompasses the same critical thinking and analytical skills as traditional engineering while moving at a rapid rate. As a software engineer I hope to continue innovating, and be at the forefront of driving technological advances. <br /><br />


              </p>
              <img src={main_img} style={{width: 300, height: '100%'}}/>
            </div>
          </Hidden>
          <Hidden smUp>
            <div id='about' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={main_img} style={{width: '80%', height: '100%', maxWidth: 500}}/>
              <p style={{ fontSize: 'medium', minWidth: 200}}>
                Hello and welcome to my website! <br /><br />
                My name is Terrence, I am a software Engineer experienced with JavaScript, React, React Native, Node.JS, SQL/NoSQL and more. <br /><br />

                Prior to software engineering, my background was in Mechanical and Materials Engineering. I've long been passionate about engineering because it combines critical thinking and problem solving in order to create exciting innovations. I fell in love with software engineering during my Master's program after writing a machine learning algorithm to reverse engineer the material properties of aluminum profiles. By incorporating computer programming to my research, I was able to produce results that were far more accurate than what I had expected. Software engineering really excites me because it encompasses the same critical thinking and analytical skills as traditional engineering while moving at a rapid rate. As a software engineer I hope to continue innovating, and be at the forefront of driving technological advances. <br /><br />
              </p>
            </div>
          </Hidden>
        </div>
        <Divider />
        <div ref={projectsRef} >
          <h1>Projects</h1>
          <Grid container>
          <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='FEC'>
                  <CardMedia
                    className={classes.media}
                    image={FEC}
                    title="Recreational Engineers Inc."
                    id='FEC'
                  />
                  <CardContent id='FEC'>
                    <Typography gutterBottom variant="h5" component="h2" id='FEC'>
                      Recreational Engineers Inc.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='FEC'>
                      <strong id='FEC'>Technologies Used: </strong> <i id='FEC'>React, MySQL, Express, Node.JS, AWS S3/EC2</i><br /><br />
                      A full stack retail web application that showcases a merchandise's images, reviews and related items.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='SDC'>
                  <CardMedia
                    className={classes.media}
                    image={SDC}
                    title="Scaling Simplified"
                    id='SDC'
                  />
                  <CardContent id='SDC'>
                    <Typography gutterBottom variant="h5" component="h2" id='SDC'>
                      Scaling Simplified
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='SDC'>
                      <strong id='SDC'>Technologies Used: </strong> <i id='SDC'>PostgreSQL, Apache Cassandra, AWS EC2, NGINX</i><br /><br />
                      Backend of an online shoe retailer capable of handling 10 million records and handling 800 RPS with average latency of 200 ms.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='MVP'>
                  <CardMedia
                    className={classes.media}
                    image={MVP}
                    title="Joey not Joey"
                    id='MVP'
                  />
                  <CardContent id='MVP'>
                    <Typography gutterBottom variant="h5" component="h2" id='MVP'>
                      Joey not Joey
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='MVP'>
                    <strong id='MVP'>Technologies Used: </strong> <i id='MVP'>React Native, Django, Django Channels, SQLite</i><br /><br />
                    A full stack mobile quiz game that has a single player mode and a real time online multiplayer mode via WebSockets.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
            {/* <Grid item={true} xs> */}
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='twong'>
                  <CardMedia
                    className={classes.media}
                    image={twong}
                    title="Personal Portfolio Site"
                    id='twong'
                  />
                  <CardContent id='twong'>
                    <Typography gutterBottom variant="h5" component="h2" id='twong'>
                      Personal Portfolio Site
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='twong'>
                    <strong id='twong'>Technologies Used: </strong> <i id='twong'>React, Material-UI, Netlify</i><br /><br />
                    My personal website that you are currently viewing. It is built using the Material-UI React framework and has a responsive UI.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='RRStore'>
                  <CardMedia
                    className={classes.media}ﬁ
                    image={generic_store}
                    title="React-Redux Generic Store"
                    id='RRStore'
                  />
                  <CardContent id='RRStore'>
                    <Typography gutterBottom variant="h5" component="h2" id='RRStore'>
                      React-Redux Online Store
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='RRStore'>
                    <strong id='RRStore'>Technologies Used: </strong> <i id='RRStore'>React, Redux, Firebase</i><br /><br />
                    The front-end of a generic online retail web application. This application utilizes Firebase authentication, and Redux/React Hooks for state management.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item={true} xs={12} sm ={6} md={6} lg={4} xl={3}>
              <Card className={classes.card} onClick={openProject}>
                <CardActionArea id='SJSU-RA'>
                  <CardMedia
                    className={classes.media}
                    image={stressStrain}
                    title="Regression Analysis"
                    id='SJSU-RA'
                  />
                  <CardContent id='SJSU-RA'>
                    <Typography gutterBottom variant="h5" component="h2" id='SJSU-RA'>
                      Characterizing Ductile Materials using Regression Analysis
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id='SJSU-RA'>
                    <strong id='SJSU-RA'>Technologies Used: </strong> <i id='SJSU-RA'>Octave</i><br /><br />
                    This is a console application that utilizes regression analysis to determine the material constants  of ductile materials.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div ref={resumeRef}>
          <h1>Resume</h1>
          <span><strong>Frontend: </strong> JavaScript (ES6), React, Redux, React Native, Mocha/Chai, Jest, HTML, CSS, JQuery, Babel, Webpack</span><br />
          <span><strong>Backend: </strong> Node.js, Express, Django, MySQL, PostgreSQL, SQLite, MongoDB, Cassandra, AWS (EC2, S3), NGINX</span><br />
          <span><strong>Others: </strong> C++, Python, MATLAB, Octave, Git, LaTeX</span><br />
          <h2>Work Experiences</h2>
          <p><strong>Full Stack Developer - UL</strong><i> - 2021 - Present</i></p>
          <ul>
            <li>Developed MERN stack software tools using agile practices</li>
            <li>Improved code maintaiinability by creating unit and end to end tests with Jest, Enzyme and React Testing Library</li>
            <li>Revised legacy code and performed code maintainence to update codebase with modern technology</li>
          </ul>
          <p><strong>Research Engineer - CTS Cement Manufacturing Corp.</strong><i> - 2018 - 2019</i></p>
          <ul>
            <li>Designed and conducted fundamental research on advanced cementitious binders</li>
            <li>Designed and conducted research projects on advancing pavement and infrastructure design by optimizing the physical and chemical properties of advanced cements</li>
            <li>Helped publish innovation findings in technical conferences</li>
          </ul>
          <p><strong>Research and Development Intern - Baker Hughes Inc.</strong><i> - 2017</i></p>
          <ul>
            <li>Conducted testing for artificial lift pumps using metallography, cross-sectional analysis and microscopy</li>
            <li>Designed and executed mechanical tests on malfunctioned parts to determind mode of failure</li>
          </ul>
          <h2>Education</h2>
          <p><strong>Hack Reactor</strong> - Advanced Software Engineering Immersive Program</p>
          <p><strong>San Jose State University</strong> - M.S. Mechanical Engineering | GPA: 3.5</p>
          <p style={{marginLeft: 25}}><strong>Coursework: </strong>Autonomous and Connected Vehicles, Advanced Mechanical Engineering Analysis, Advanced Heat Transfer, Automatic Control Engineering</p>
          <p style={{marginLeft: 25}}><strong>Projects: </strong>Modelling Plastic Behavior of Extruded Aluminum Profiles, Thermal Analysis of Heat Induced Stresses of Rapid Setting Cement during Hydration, Optimization of a Rover Wheel Fork using Finite Element Analysis
          </p>
          <p><strong>University of California, Los Angeles</strong> - B.S. Materials Science and Engineering | GPA: 3.2</p>
          <p style={{marginLeft: 25}}><strong>Coursework: </strong>Introduction to Structured Programming in C++, Object-Oriented Programming Methods</p>
          <p style={{marginLeft: 25}}><strong>Activities and Societies: </strong>Materials Research Society, Society for the Advancement of Material and Process Engineering (SAMPE)
          </p>
          <button onClick={()=>{window.open('https://drive.google.com/file/d/1chbif55hHzMeb7ggnhO0F-9j_4oRXa6k/view?usp=sharing', '_blank')}} >View Full Resume</button>
        </div>
        <br />
        <Divider />
        <div ref={contactRef}>
          <h1>Contact</h1>
          <div>
            <h3>Email</h3>
            <div onClick={()=>{window.location.href = 'mailto:terrencew07@ucla.edu'}} style={{display: 'flex', flexDirection: 'row', alignItems:'center', cursor: 'pointer'}}>
              <EmailIcon />
              <span style={{paddingLeft: 15}}>terrencew07@ucla.edu</span>
            </div>
            <h3>Social Media</h3>
            <div onClick={()=>{window.open('https://linkedin.com/in/terrence-wong', '_blank')}} style={{display: 'flex', flexDirection: 'row', alignItems:'center', cursor: 'pointer'}}>
              <LinkedInIcon />
              <span style={{paddingLeft: 15}}>https://linkedin.com/in/terrence-wong</span>
            </div>
            <div onClick={()=>{window.open('https://github.com/twong0088', '_blank')}} style={{display: 'flex', flexDirection: 'row', alignItems:'center', cursor: 'pointer'}}>
              <GitHubIcon />
              <span style={{paddingLeft: 15}}>https://github.com/twong0088</span>
            </div>
            <h3>Resume</h3>
            <div onClick={()=>{window.open('https://drive.google.com/file/d/1chbif55hHzMeb7ggnhO0F-9j_4oRXa6k/view?usp=sharing', '_blank')}} style={{display: 'flex', flexDirection: 'row', alignItems:'center', cursor: 'pointer'}}>
              <AccountBoxIcon />
              <span style={{paddingLeft: 15}}>My Resume</span>
            </div>
          </div>
        </div>
      </main>
      {showModal ? <Modal close={setShowModal} proj={projDetails} /> : null}
    </div>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;