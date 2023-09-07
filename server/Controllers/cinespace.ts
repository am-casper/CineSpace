import { load } from "https://deno.land/std@0.201.0/dotenv/mod.ts";
import { Video } from "../types.ts";

const { DATA_API_KEY, BASE_URI } = await load({ export: true });

const DATA_SOURCE = "OmegaCluster";
const DATABASE = "cinespace";
const COLLECTION = "videos";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apiKey: DATA_API_KEY,
  },
  body: "",
};

// !addVideo
const addVideo = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const { thumbnail, isKids, uploadedBy, title, desc } =
        await request.body().value;
      const video: Video = {
        thumbnail,
        dislikeCount: 0,
        viewsCount: 0,
        isKids,
        uploadedBy,
        title,
        desc,
        comments: [],
      };

      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: video,
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      if (dataResponse.ok) {
        response.status = 201;
        response.body = {
          success: true,
          data: video,
          insertedId,
        };
      } else {
        response.status = 500;
        response.body = {
          success: false,
          errmsg: "Can't add the video into the db",
        };
      }
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// !getVideos

const getVideos = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allVideos = await dataResponse.json();
    if (dataResponse.ok) {
      response.status = 200;
      response.body = {
        success: true,
        data: allVideos,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Can't fetch videos from db",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// !getVideo
const getVideo = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const URI = `${BASE_URI}/findOne`;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: {
      _id: {
        $oid: params.id,
      },
    },
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const video = await dataResponse.json();

  if (dataResponse.ok) {
    response.status = 200;
    response.body = {
      success: true,
      data: video,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No video found",
    };
  }
};

export { addVideo, getVideos, getVideo };
