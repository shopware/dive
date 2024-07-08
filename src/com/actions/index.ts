import SET_BACKGROUND from "./scene/setbackground.ts";
import RESET_CAMERA from "./camera/resetcamera.ts";
import SET_CAMERA_LAYER from "./camera/setcameralayer.ts";
import ZOOM_CAMERA from "./camera/zoomcamera.ts";
import SET_GIZMO_MODE from "./toolbox/select/setgizmomode.ts";
import SET_CAMERA_TRANSFORM from "./camera/setcameratransform.ts";
import MOVE_CAMERA from "./camera/movecamera.ts";
import PLACE_ON_FLOOR from "./object/model/placeonfloor.ts";
import GET_ALL_OBJECTS from "./object/getallobjects.ts";
import GET_OBJECTS from "./object/getobjects.ts";
import ADD_OBJECT from "./object/addobject.ts";
import DELETE_OBJECT from "./object/deleteobject.ts";
import UPDATE_OBJECT from "./object/updateobject.ts";
import MODEL_LOADED from "./object/model/modelloaded.ts";
import UPDATE_SCENE from "./scene/updatescene.ts";
import GENERATE_MEDIA from "./media/generatemedia.ts";
import GET_ALL_SCENE_DATA from "./scene/getallscenedata.ts";
import SELECT_OBJECT from "./object/selectobject.ts";
import DESELECT_OBJECT from "./object/deselectobject.ts";
import GET_CAMERA_TRANSFORM from "./camera/getcameratransform.ts";
import DROP_IT from "./object/model/dropit.ts";

export type Actions = {
    GET_ALL_SCENE_DATA: GET_ALL_SCENE_DATA,
    GET_ALL_OBJECTS: GET_ALL_OBJECTS,
    GET_OBJECTS: GET_OBJECTS,
    ADD_OBJECT: ADD_OBJECT,
    UPDATE_OBJECT: UPDATE_OBJECT,
    DELETE_OBJECT: DELETE_OBJECT,
    SELECT_OBJECT: SELECT_OBJECT,
    DESELECT_OBJECT: DESELECT_OBJECT,
    SET_BACKGROUND: SET_BACKGROUND,
    DROP_IT: DROP_IT,
    PLACE_ON_FLOOR: PLACE_ON_FLOOR,
    SET_CAMERA_TRANSFORM: SET_CAMERA_TRANSFORM,
    GET_CAMERA_TRANSFORM: GET_CAMERA_TRANSFORM,
    MOVE_CAMERA: MOVE_CAMERA,
    RESET_CAMERA: RESET_CAMERA,
    SET_CAMERA_LAYER: SET_CAMERA_LAYER,
    ZOOM_CAMERA: ZOOM_CAMERA,
    SET_GIZMO_MODE: SET_GIZMO_MODE,
    MODEL_LOADED: MODEL_LOADED,
    UPDATE_SCENE: UPDATE_SCENE,
    GENERATE_MEDIA: GENERATE_MEDIA,
};
