import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'styles/Container';
import MobileNavbar from 'components/MobileNavbar';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import Home from 'pages/Home';
import WatchVideoPage from 'pages/WatchVideo';
import Channel from 'pages/Channel';
import SearchResults from 'pages/SearchResults';
import TrendingPage from 'pages/Trending';
import Subscriptions from 'pages/Subscriptions';
import Library from 'pages/Library';
import History from 'pages/History';
import YourVideos from 'pages/YourVideos';
import LikedVideos from 'pages/LikedVideos';
import NotFound from 'pages/NotFound';
import { useLocationChange } from 'hooks/use-location-change';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const toggleSidebarOpen = () => setSidebarOpen(!isSidebarOpen);

  useLocationChange(handleCloseSidebar);

  return (
    <>
      <Navbar toggleSidebarOpen={toggleSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <MobileNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/watch/:videoId" component={WatchVideoPage} />
          <Route path="/channel/:channelId" component={Channel} />
          <Route path="/results/:searchQuery" component={SearchResults} />
          <Route path="/feed/trending" component={TrendingPage} />
          <Route path="/feed/subscriptions" component={Subscriptions} />
          <Route path="/feed/library" component={Library} />
          <Route path="/feed/history" component={History} />
          <Route path="/feed/my-videos" component={YourVideos} />
          <Route path="/feed/liked-videos" component={LikedVideos} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
