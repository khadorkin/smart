import React, {Component} from 'react';
import Parent from '../../../parent/containers/Parent/Parent';
import playlist from 'services/storage/playlist';

class MultiGrid extends Component {

  render() {
    return (
      <div>
        {Object.keys(playlist).map(function getPlaylists(playlistName, index) {
          return (
            <Parent videoIds={playlist[playlistName]}
                    key={playlistName}
                    ref={ index + '-' + playlistName }
                    copiedRef={ index + '-' + playlistName }/>
          );
        })}
      </div>
    );
  }
}

export default MultiGrid;
