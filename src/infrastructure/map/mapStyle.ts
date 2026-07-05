import type { StyleSpecification } from "maplibre-gl";

export const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    // 背景地図 OpenStreetMapのラスタタイル
    "background-osm-raster": {
      type: "raster",
      tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "<a href='https://www.openstreetmap.org/copyright' target='_blank'>© OpenStreetMap contributors</a>",
    },
    // 地形データ
    "aws-terrain": {
      type: "raster-dem",
      minzoom: 1,
      maxzoom: 15,
      encoding: "terrarium",
      tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
      attribution:
        // see 'https://github.com/tilezen/joerd/blob/master/docs/attribution.md'
        "\
        ArcticDEM terrain data DEM(s) were created from DigitalGlobe, Inc., imagery and funded under National Science Foundation awards 1043681, 1559691, and 1542736; \
        Australia terrain data © Commonwealth of Australia (Geoscience Australia) 2017;\
        Austria terrain data © offene Daten Österreichs – Digitales Geländemodell (DGM) Österreich;\
        Canada terrain data contains information licensed under the Open Government Licence – Canada;\
        Europe terrain data produced using Copernicus data and information funded by the European Union - EU-DEM layers;\
        Global ETOPO1 terrain data U.S. National Oceanic and Atmospheric Administration\
        Mexico terrain data source: INEGI, Continental relief, 2016;\
        New Zealand terrain data Copyright 2011 Crown copyright (c) Land Information New Zealand and the New Zealand Government (All rights reserved);\
        Norway terrain data © Kartverket;\
        United Kingdom terrain data © Environment Agency copyright and/or database right 2015. All rights reserved;\
        United States 3DEP (formerly NED) and global GMTED2010 and SRTM terrain data courtesy of the U.S. Geological Survey.",
    },
    // 登記所備付地図
    "amx-a-pmtiles": {
      type: "vector",
      minzoom: 2,
      maxzoom: 16,
      url: "pmtiles://https://habs.rad.naro.go.jp/spatial_data/amx/a.pmtiles",
      attribution: "<a href='https://www.moj.go.jp/MINJI/minji05_00494.html' target='_blank'>登記所備付地図データ（法務省）</a>",
    },
    // 3D都市モデル（Project PLATEAU）東京都23区（2020年度）建物データ
    "plateau-bldg": {
      type: "vector",
      tiles: ["https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf"],
      minzoom: 10,
      maxzoom: 16,
      attribution: "<a href='https://github.com/indigo-lab/plateau-lod2-mvt'>plateau-lod2-mvt by indigo-lab</a> (<a href='https://www.mlit.go.jp/plateau/'>国土交通省 Project PLATEAU</a> のデータを加工して作成)",
    },
  },
  layers: [
    { id: "background-osm-raster", type: "raster", source: "background-osm-raster" },
    // 陰影起伏
    { id: "hills", type: "hillshade", source: "aws-terrain" },
    // 登記所備付地図データ 間引きなし
    {
      id: "amx-a-fude-polygon",
      type: "fill",
      source: "amx-a-pmtiles",
      "source-layer": "fude",
      paint: {
        "fill-color": "rgba(254, 217, 192, 1)",
        "fill-outline-color": "rgba(255, 0, 0, 1)",
        "fill-opacity": 0.4,
      },
    },
    // NOTE: 3D Terrainを表示すると、fill-outline-colorが効かない不具合が起きるため、lineレイヤを追加する
    {
      id: "amx-a-fude-line",
      type: "line",
      source: "amx-a-pmtiles",
      "source-layer": "fude",
      paint: { "line-color": "rgba(255, 0, 0, 1)", "line-width": 0.1 },
    },
    // 登記所備付地図データ 代表点レイヤ
    {
      id: "amx-a-daihyo",
      type: "heatmap",
      source: "amx-a-pmtiles",
      "source-layer": "daihyo",
      paint: {
        "heatmap-color": [
          "interpolate", ["linear"], ["heatmap-density"],
          0, "rgba(255, 255, 255, 0)",
          0.5, "rgba(255, 255, 0, 0.5)",
          1, "rgba(255, 0, 0, 0.5)",
        ],
        "heatmap-radius": ["interpolate", ["exponential", 10], ["zoom"], 2, 5, 14, 50],
      },
    },
    // PLATEAU 建物データ
    {
      id: "bldg",
      type: "fill-extrusion",
      source: "plateau-bldg",
      "source-layer": "bldg",
      paint: {
        "fill-extrusion-height": ["*", ["get", "z"], 1],
        "fill-extrusion-color": "#797979",
        "fill-extrusion-opacity": 0.7,
      },
    },
  ],
  terrain: { source: "aws-terrain", exaggeration: 1 },
  sky: {
    "sky-color": "#199EF3",
    "sky-horizon-blend": 0.5,
    "horizon-color": "#ffffff",
    "horizon-fog-blend": 0.5,
    "fog-color": "#0000ff",
    "fog-ground-blend": 0.5,
    "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 10, 1, 12, 0],
  },
};
