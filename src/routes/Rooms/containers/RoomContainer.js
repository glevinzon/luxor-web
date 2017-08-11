import {connect} from 'react-redux'
import Room from '../components/Room'

import { createRoom, getRooms, deleteRoom, updateRoom } from 'store/modules/room'
import { getBranches } from 'store/modules/branch'
import { uploadImage, getDumb, getUploadsByRoomId, deleteUploadsByRoomCodes } from 'store/modules/upload'

const mapActionCreators = {
  createRoom,
  getRooms,
  deleteRoom,
  getBranches,
  uploadImage,
  getDumb,
  getUploadsByRoomId,
  deleteUploadsByRoomCodes,
  updateRoom
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  rooms: state.room.get('rooms'),
  deletingRoomSuccess: state.room.get('deletingRoomSuccess'),
  room: state.room.get('room'),
  creatingRoomSuccess: state.room.get('creatingRoomSuccess'),
  branches: state.branch.get('branches'),
  upload: state.upload.get('upload'),
  uploadingImageSuccess: state.upload.get('uploadingImageSuccess'),
  target: state.upload.get('target'),
  gettingDumbSuccess: state.upload.get('gettingDumbSuccess'),
  uploadingImage: state.upload.get('uploadingImage'),
  uploadsByRoomId: state.upload.get('uploadsByRoomId'),
  fetchingUploadsByRoomIdSuccess: state.upload.get('fetchingUploadsByRoomIdSuccess'),
  deletingUploadsByRoomCodesSuccess: state.upload.get('deletingUploadsByRoomCodesSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Room)

