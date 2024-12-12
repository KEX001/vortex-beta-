new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      searchQuery: '',
      searchResults: [],
      currentTrack: null,
      currentTrackIndex: 0,
      isTimerPlaying: false,
    };
  },
  methods: {
    searchSongs() {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }

      // Simulating API call (replace with actual API if necessary)
      const simulatedResults = [
        {
          name: "Sanam Re",
          artist: "Arijit Singh",
          cover: "https://example.com/sanam-re-cover.jpg",
          source: "https://example.com/sanam-re.mp3",
        },
        // More songs can be added here
      ];

      this.searchResults = simulatedResults.filter(song => song.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    selectTrack(track) {
      this.currentTrack = track;
      this.audio = new Audio(track.source);
      this.audio.play();
      this.isTimerPlaying = true;
    },
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    prevTrack() {
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.searchResults.length - 1;
      }
      this.currentTrack = this.searchResults[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      if (this.currentTrackIndex < this.searchResults.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.searchResults[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    downloadTrack() {
      const link = document.createElement('a');
      link.href = this.currentTrack.source;
      link.download = this.currentTrack.name + '.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});
