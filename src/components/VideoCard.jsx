import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // ユーザーインタラクションを検知する関数
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  // 自動再生の代わりに、ユーザーインタラクション後に再生を試行
  useEffect(() => {
    if (autoplay && hasUserInteracted) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log('動画の自動再生に失敗しました:', error);
        }
      };
      playVideo();
    }
  }, [autoplay, hasUserInteracted]);

  const onVideoPress = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    if (videoRef.current.paused) {
      videoRef.current.play().catch(error => {
        console.log('動画の再生に失敗しました:', error);
      });
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="video" onClick={handleUserInteraction}>
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        muted
        playsInline
        preload="metadata"
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          {/* The left part of the container */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* The right part of the container */}
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
