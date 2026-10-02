import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Satellite, 
  Mountain, 
  Map as MapIcon, 
  Compass, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldAlert, 
  Droplet, 
  Layers, 
  Info,
  Maximize2
} from 'lucide-react';
import { sounds } from '../utils/audio';

// Tile Providers for Realistic Mapping
const TILE_LAYERS = {
  satellite: {
    name: 'Ảnh Vệ Tinh Chân Thật (Esri Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
  topo: {
    name: 'Địa Hình Tự Nhiên & Cao Độ (Esri Topo)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    maxZoom: 18,
  },
  street: {
    name: 'Bản Đồ Địa Lí & Thủy Văn (Carto Voyager)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  }
};

// Real-world WGS84 coordinates for the Mekong River course
const MEKONG_FLOW_COORDINATES: [number, number][] = [
  [33.71, 94.68], // Ngọn nguồn Tanggula (Tây Tạng) ~5.224m
  [33.15, 96.20], // Yushu, Thanh Hải
  [32.28, 96.75], 
  [31.14, 97.17], // Chamdo, Tây Tạng
  [29.85, 98.60], 
  [28.48, 98.85], // Tam Giang Song Hành (Three Parallel Rivers)
  [26.85, 99.30], 
  [25.60, 99.88], // Đại Lý / Vân Nam
  [24.70, 100.09], // Đập Tiểu Loan (Xiaowan Dam)
  [23.85, 100.22], 
  [22.64, 100.43], // Đập Nọa Trát Độ (Nuozhadu Dam)
  [22.01, 100.79], // Cảnh Hồng (Jinghong)
  [21.50, 101.15], // Biên giới Trung Quốc - Lào - Myanmar
  [20.90, 100.80], // Biên giới Myanmar - Lào
  [20.35, 100.08], // Tam Giác Vàng (Golden Triangle)
  [20.27, 100.41], // Huay Xai (Lào)
  [19.89, 101.12], // Pakbeng
  [19.89, 102.13], // Luang Prabang
  [19.25, 101.81], // Đập Xayaburi
  [18.50, 102.10], 
  [17.96, 102.61], // Thủ đô Viêng Chăn (Vientiane)
  [17.88, 102.74], // Nong Khai (Thái Lan)
  [18.20, 103.65], // Bueng Kan
  [17.40, 104.80], // Nakhon Phanom / Thakhek
  [16.54, 104.75], // Savannakhet / Mukdahan
  [15.70, 105.35], 
  [15.12, 105.78], // Pakse (Champasak, Nam Lào)
  [14.20, 105.90], 
  [13.94, 105.94], // Thác Khone Phapheng & Đập Don Sahong
  [13.52, 105.97], // Stung Treng (Campuchia, hợp lưu sông 3S)
  [12.48, 106.02], // Kratie (Cá heo Irrawaddy)
  [12.00, 105.46], // Kampong Cham
  [11.56, 104.93], // Phnôm Pênh (Chaktomuk & hợp lưu Tonle Sap)
  [11.00, 105.15], // Biên giới Campuchia - Việt Nam
  [10.80, 105.24], // Tân Châu (Sông Tiền, An Giang)
  [10.46, 105.63], // Cao Lãnh (Đồng Tháp)
  [10.35, 106.36], // Mỹ Tho - Bến Tre
  [10.25, 106.75], // Cửa Tiểu & Cửa Đại (Biển Đông)
];

// Bassac River Branch (Sông Hậu)
const BASSAC_BRANCH_COORDINATES: [number, number][] = [
  [11.56, 104.93], // Phnôm Pênh
  [10.70, 105.12], // Châu Đốc (An Giang)
  [10.38, 105.43], // Long Xuyên
  [10.04, 105.78], // TP Cần Thơ
  [9.72, 106.05], // Sóc Trăng
  [9.52, 106.28], // Cửa Định An & Cửa Trần Đề (Biển Đông)
];

// Tonle Sap Lake & River Branch
const TONLE_SAP_COORDINATES: [number, number][] = [
  [13.25, 103.80], // Vùng hồ Tonle Sap Tây Bắc
  [12.85, 104.15], // Thân hồ Biển Hồ
  [12.40, 104.60], // Hạ lưu hồ
  [11.95, 104.82], // Sông Tonle Sap
  [11.56, 104.93], // Phnom Penh Chaktomuk
];

// Real Basin Boundary Approximation Polygon
const BASIN_BOUNDARY_COORDINATES: [number, number][] = [
  [33.90, 94.20],
  [34.10, 96.50],
  [32.80, 98.20],
  [30.50, 99.40],
  [28.20, 100.20],
  [26.10, 101.30],
  [24.50, 102.00],
  [22.20, 102.60],
  [20.50, 103.80],
  [19.00, 104.50],
  [17.80, 105.50],
  [16.20, 107.20],
  [14.80, 108.30], // Dãy Trường Sơn Tây Nguyên
  [12.90, 108.50],
  [11.80, 107.50],
  [10.50, 106.90],
  [9.30, 106.50], // Cửa biển ĐBSCL
  [8.50, 105.00], // Mũi Cà Mau
  [9.50, 104.50], // Rạch Giá - Kiên Giang
  [10.80, 103.80], // Vịnh Thái Lan ven bờ Campuchia
  [12.20, 103.00], // Dãy núi Cardamom
  [14.00, 102.20], // Dãy Dangrek
  [15.50, 101.20], // Rìa Tây cao nguyên Khorat (Thái Lan)
  [17.50, 100.80],
  [19.50, 99.80],
  [21.80, 99.20],
  [24.00, 98.50],
  [27.50, 98.10],
  [30.20, 96.80],
  [32.50, 94.80],
  [33.90, 94.20],
];

// Key Real Landmarks
interface RealLandmark {
  id: string;
  name: string;
  category: 'source' | 'dam' | 'city' | 'lake' | 'delta' | 'extreme';
  position: [number, number];
  country: string;
  description: string;
  elevationM?: number;
  badge?: string;
  flowM3s?: number;
}

const REAL_LANDMARKS: RealLandmark[] = [
  {
    id: 'pt-north',
    name: 'Cực Bắc Lưu Vực (33°50\'B, 94°40\'Đ)',
    category: 'extreme',
    position: [33.83, 94.68],
    country: 'Trung Quốc',
    description: 'Dãy núi Tanggula, cao nguyên Thanh Tạng (độ cao trên 5.200m). Nơi bắt nguồn từ sông băng vĩnh cửu.',
    elevationM: 5224,
    badge: 'Cực Bắc'
  },
  {
    id: 'pt-south',
    name: 'Cực Nam Lưu Vực (8°35\'B, 104°45\'Đ)',
    category: 'extreme',
    position: [8.60, 104.75],
    country: 'Việt Nam',
    description: 'Mũi Cà Mau & Vùng ngập mặn cực nam bán đảo Cà Mau, nơi dòng phù sa Mê Kông bồi đắp lấn biển.',
    elevationM: 1,
    badge: 'Cực Nam'
  },
  {
    id: 'pt-west',
    name: 'Cực Tây Lưu Vực (94°00\'Đ)',
    category: 'extreme',
    position: [32.50, 94.05],
    country: 'Trung Quốc',
    description: 'Thượng nguồn suối băng Zhaqu (Lan Thương Giang) giáp ranh cao nguyên Tây Tạng.',
    elevationM: 4800,
    badge: 'Cực Tây'
  },
  {
    id: 'pt-east',
    name: 'Cực Đông Lưu Vực (106°45\'Đ)',
    category: 'extreme',
    position: [10.25, 106.75],
    country: 'Việt Nam',
    description: 'Cửa Đại và Cửa Tiểu (Tiền Giang - Bến Tre) đổ ra Biển Đông.',
    elevationM: 0,
    badge: 'Cực Đông'
  },
  {
    id: 'dam-xiaowan',
    name: 'Đập Thủy Điện Tiểu Loan (Xiaowan Dam)',
    category: 'dam',
    position: [24.70, 100.09],
    country: 'Trung Quốc (Vân Nam)',
    description: 'Đập vòm bê tông cao thứ 2 thế giới (292m), công suất 4.200 MW, dung tích hồ chứa 15 tỷ m³.',
    elevationM: 1240,
    badge: 'Đập 292m • 4.200 MW'
  },
  {
    id: 'dam-nuozhadu',
    name: 'Đập Thủy Điện Nọa Trát Độ (Nuozhadu Dam)',
    category: 'dam',
    position: [22.64, 100.43],
    country: 'Trung Quốc (Vân Nam)',
    description: 'Đập thủy điện lớn nhất trên dòng sông Mê Kông với công suất 5.850 MW, dung tích hồ 23,7 tỷ m³.',
    elevationM: 812,
    badge: 'Đập 261m • 5.850 MW'
  },
  {
    id: 'dam-xayaburi',
    name: 'Đập Thủy Điện Xayaburi',
    category: 'dam',
    position: [19.25, 101.81],
    country: 'Lào',
    description: 'Đập thủy điện dòng chính đầu tiên ở Hạ lưu vực Mê Kông (LMB), công suất 1.285 MW.',
    elevationM: 275,
    badge: 'Đập Hạ Lưu • 1.285 MW'
  },
  {
    id: 'dam-donsahong',
    name: 'Đập Thủy Điện Don Sahong',
    category: 'dam',
    position: [13.94, 105.94],
    country: 'Lào',
    description: 'Nằm ngay gần Thác Khone Phapheng, công suất 260 MW, gây nhiều tranh cãi về cản trở luồng cá di cư.',
    elevationM: 70,
    badge: '260 MW • Cạnh Thác Khone'
  },
  {
    id: 'city-vientiane',
    name: 'Thủ Đô Viêng Chăn (Vientiane)',
    category: 'city',
    position: [17.96, 102.61],
    country: 'Lào',
    description: 'Thủ đô nằm sát bờ tả ngạn sông Mê Kông, đối diện là thị trấn Nong Khai của Thái Lan.',
    elevationM: 165,
    flowM3s: 4300,
  },
  {
    id: 'nature-khone',
    name: 'Thác Khone Phapheng (Champasak)',
    category: 'lake',
    position: [13.95, 105.92],
    country: 'Lào - Campuchia',
    description: 'Thác nước có lưu lượng lớn nhất châu Á và Đông Nam Á. Rào cản tự nhiên ngăn giao thông thủy lên thượng nguồn.',
    elevationM: 70,
    flowM3s: 11000,
  },
  {
    id: 'nature-tonlesap',
    name: 'Biển Hồ Campuchia (Tonle Sap Lake)',
    category: 'lake',
    position: [12.85, 104.15],
    country: 'Campuchia',
    description: 'Hồ nước ngọt lớn nhất Đông Nam Á, kỳ quan đảo chiều dòng chảy theo mùa. Vùng đánh bắt cá nước ngọt trù phú bậc nhất.',
    elevationM: 10,
    badge: 'Kỳ Quan Thủy Văn'
  },
  {
    id: 'city-phnompenh',
    name: 'Phnôm Pênh - Ngã Tư Sông Chaktomuk',
    category: 'city',
    position: [11.56, 104.93],
    country: 'Campuchia',
    description: 'Nơi hợp lưu của sông Mê Kông trên, Mê Kông dưới, sông Tonle Sap và sông Bassac.',
    elevationM: 12,
    flowM3s: 15000,
  },
  {
    id: 'delta-tanchau',
    name: 'Tân Châu - Châu Đốc (Đầu Nguồn ĐBSCL)',
    category: 'delta',
    position: [10.80, 105.24],
    country: 'Việt Nam (An Giang)',
    description: 'Cửa ngõ tiếp nhận toàn bộ lượng nước ngọt, phù sa và mùa nước nổi từ Campuchia đổ vào Việt Nam.',
    elevationM: 4,
    flowM3s: 13500,
  },
  {
    id: 'delta-cuulong',
    name: 'Đồng Bằng Sông Cửu Long & 9 Cửa Biển',
    category: 'delta',
    position: [10.05, 106.30],
    country: 'Việt Nam',
    description: 'Châu thổ trù phú bậc nhất Việt Nam với diện tích 40.000 km², đổ ra Biển Đông qua các cửa Đại, Tiểu, Hàm Luông, Cổ Chiên, Cung Hầu, Định An, Trần Đề.',
    elevationM: 1.5,
    badge: 'Vựa Lúa Việt Nam'
  }
];

export const RealMekongMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTileKey, setActiveTileKey] = useState<'satellite' | 'topo' | 'street'>('satellite');
  const [selectedLandmark, setSelectedLandmark] = useState<RealLandmark>(REAL_LANDMARKS[13]); // Default Delta
  const [showBasinPolygon, setShowBasinPolygon] = useState<boolean>(true);
  const [showRiverPath, setShowRiverPath] = useState<boolean>(true);
  const [showDams, setShowDams] = useState<boolean>(true);
  const [showStations, setShowStations] = useState<boolean>(true);

  // Layers storage in ref to toggle without full map rebuild
  const layersGroupRef = useRef<{
    basinPolygon?: L.Polygon;
    riverPath?: L.Polyline;
    bassacPath?: L.Polyline;
    tonleSapPath?: L.Polyline;
    markersGroup?: L.LayerGroup;
  }>({});

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map centered on Indochina and Mekong basin
    const map = L.map(mapContainerRef.current, {
      center: [18.5, 102.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 16,
      zoomControl: false,
    });

    // Add initial tile layer
    const initialConfig = TILE_LAYERS.satellite;
    const tileLayer = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Scale bar in bottom left
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Switch
  const switchTileLayer = (key: 'satellite' | 'topo' | 'street') => {
    sounds.playClick();
    setActiveTileKey(key);
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const config = TILE_LAYERS[key];
    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  };

  // Render Overlays: River Flow, Basin Boundary, and Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous vector layers
    if (layersGroupRef.current.basinPolygon) {
      map.removeLayer(layersGroupRef.current.basinPolygon);
    }
    if (layersGroupRef.current.riverPath) {
      map.removeLayer(layersGroupRef.current.riverPath);
    }
    if (layersGroupRef.current.bassacPath) {
      map.removeLayer(layersGroupRef.current.bassacPath);
    }
    if (layersGroupRef.current.tonleSapPath) {
      map.removeLayer(layersGroupRef.current.tonleSapPath);
    }
    if (layersGroupRef.current.markersGroup) {
      map.removeLayer(layersGroupRef.current.markersGroup);
    }

    // 1. Basin Polygon (795,000 km²)
    if (showBasinPolygon) {
      const basinPolygon = L.polygon(BASIN_BOUNDARY_COORDINATES, {
        color: '#10b981',
        weight: 2,
        dashArray: '5, 5',
        fillColor: '#059669',
        fillOpacity: 0.12,
      }).addTo(map);
      basinPolygon.bindTooltip('Phạm vi lưu vực Sông Mê Kông (795.000 km²)', {
        sticky: true,
        className: 'font-semibold text-xs text-emerald-900',
      });
      layersGroupRef.current.basinPolygon = basinPolygon;
    }

    // 2. River Polyline
    if (showRiverPath) {
      // Main Stem
      const riverPath = L.polyline(MEKONG_FLOW_COORDINATES, {
        color: '#38bdf8',
        weight: 4,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
      riverPath.bindTooltip('Dòng chính Sông Mê Kông (~4.763 km)', {
        sticky: true,
        className: 'font-bold text-xs text-sky-900',
      });
      layersGroupRef.current.riverPath = riverPath;

      // Bassac River Branch
      const bassacPath = L.polyline(BASSAC_BRANCH_COORDINATES, {
        color: '#06b6d4',
        weight: 3.5,
        opacity: 0.9,
      }).addTo(map);
      layersGroupRef.current.bassacPath = bassacPath;

      // Tonle Sap Lake & River
      const tonleSapPath = L.polyline(TONLE_SAP_COORDINATES, {
        color: '#0284c7',
        weight: 3.5,
        opacity: 0.85,
      }).addTo(map);
      layersGroupRef.current.tonleSapPath = tonleSapPath;
    }

    // 3. Markers Layer Group
    const markersGroup = L.layerGroup().addTo(map);
    layersGroupRef.current.markersGroup = markersGroup;

    REAL_LANDMARKS.forEach((landmark) => {
      // Filter based on toggles
      if (landmark.category === 'dam' && !showDams) return;
      if (landmark.category !== 'dam' && !showStations && landmark.category !== 'extreme') return;

      let markerHtml = '';
      let markerClass = '';

      if (landmark.category === 'extreme') {
        markerHtml = `<div class="w-6 h-6 rounded-full bg-rose-600 border-2 border-white text-white flex items-center justify-center text-[10px] font-black shadow-lg animate-pulse">📍</div>`;
        markerClass = 'custom-extreme-pin';
      } else if (landmark.category === 'dam') {
        markerHtml = `<div class="w-6 h-6 rounded-lg bg-amber-500 border-2 border-white text-slate-950 flex items-center justify-center text-[11px] font-black shadow-lg">⚡</div>`;
        markerClass = 'custom-dam-pin';
      } else if (landmark.category === 'lake') {
        markerHtml = `<div class="w-6 h-6 rounded-full bg-cyan-600 border-2 border-white text-white flex items-center justify-center text-[11px] shadow-lg">🌊</div>`;
        markerClass = 'custom-lake-pin';
      } else if (landmark.category === 'delta') {
        markerHtml = `<div class="w-6 h-6 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center text-[11px] shadow-lg">🌾</div>`;
        markerClass = 'custom-delta-pin';
      } else {
        markerHtml = `<div class="w-5 h-5 rounded-full bg-sky-500 border-2 border-white text-white flex items-center justify-center text-[9px] shadow-md">💧</div>`;
        markerClass = 'custom-station-pin';
      }

      const customIcon = L.divIcon({
        html: markerHtml,
        className: markerClass,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(landmark.position, { icon: customIcon }).addTo(markersGroup);

      // Click to select
      marker.on('click', () => {
        sounds.playClick();
        setSelectedLandmark(landmark);
        map.flyTo(landmark.position, Math.max(map.getZoom(), 8), { duration: 1.2 });
      });

      marker.bindTooltip(`<strong>${landmark.name}</strong><br/><span class="text-xs text-slate-500">${landmark.country}</span>`, {
        direction: 'top',
        offset: [0, -10],
      });
    });

  }, [showBasinPolygon, showRiverPath, showDams, showStations]);

  // Fly to presets
  const handleFlyTo = (coords: [number, number], zoom: number, landmark?: RealLandmark) => {
    sounds.playClick();
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(coords, zoom, { duration: 1.5 });
    if (landmark) {
      setSelectedLandmark(landmark);
    }
  };

  return (
    <div className="space-y-4">
      {/* Real Map Navigation & Preset View Buttons */}
      <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-teal-400" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Bản Đồ Vệ Tinh Trực Quan Khảo Sát Thực Tế
            </h3>
            <p className="text-[11px] text-slate-400">
              Dữ liệu ảnh vệ tinh độ phân giải cao toàn cầu (Esri World Imagery) kết hợp WGS84
            </p>
          </div>
        </div>

        {/* Quick Fly-to Locations */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold mr-1">Bay nhanh đến:</span>
          <button
            onClick={() => handleFlyTo([18.5, 102.5], 5)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer font-medium text-[11px]"
          >
            🌏 Toàn Lưu Vực
          </button>
          <button
            onClick={() => handleFlyTo([33.71, 94.68], 8, REAL_LANDMARKS[0])}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer font-medium text-[11px]"
          >
            🏔️ Nguồn Tây Tạng
          </button>
          <button
            onClick={() => handleFlyTo([24.70, 100.09], 9, REAL_LANDMARKS[4])}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer font-medium text-[11px]"
          >
            ⚡ Đập Tiểu Loan
          </button>
          <button
            onClick={() => handleFlyTo([12.85, 104.15], 8, REAL_LANDMARKS[10])}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all cursor-pointer font-medium text-[11px]"
          >
            🌊 Biển Hồ (Tonle Sap)
          </button>
          <button
            onClick={() => handleFlyTo([10.20, 105.80], 8, REAL_LANDMARKS[13])}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 transition-all cursor-pointer font-extrabold text-[11px]"
          >
            🌾 ĐBSCL (Việt Nam)
          </button>
        </div>
      </div>

      {/* Map Stage Container with Floating Controls */}
      <div className="relative w-full aspect-[16/10] min-h-[460px] sm:min-h-[560px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        {/* Leaflet Map Target */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top-Left Floating: Tile Layer Switcher */}
        <div className="absolute top-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md rounded-2xl p-1.5 border border-slate-700 shadow-xl flex items-center gap-1">
          <button
            onClick={() => switchTileLayer('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTileKey === 'satellite'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Ảnh Vệ Tinh</span>
          </button>

          <button
            onClick={() => switchTileLayer('topo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTileKey === 'topo'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Địa Hình Cao Độ</span>
          </button>

          <button
            onClick={() => switchTileLayer('street')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTileKey === 'street'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Địa Lí Bản Đồ</span>
          </button>
        </div>

        {/* Top-Right Floating: Layer Visibility Toggles */}
        <div className="absolute top-16 right-3 z-[400] bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 border border-slate-700 shadow-xl space-y-1 text-xs text-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-teal-400" />
            <span>Lớp Dữ Liệu</span>
          </div>
          <label className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showBasinPolygon}
              onChange={(e) => setShowBasinPolygon(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
            />
            <span className="text-[11px]">Ranh giới 795.000 km²</span>
          </label>
          <label className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showRiverPath}
              onChange={(e) => setShowRiverPath(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
            />
            <span className="text-[11px]">Dòng chính 4.763 km</span>
          </label>
          <label className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showDams}
              onChange={(e) => setShowDams(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
            />
            <span className="text-[11px]">⚡ Đập thủy điện</span>
          </label>
          <label className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showStations}
              onChange={(e) => setShowStations(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
            />
            <span className="text-[11px]">💧 Trạm thủy văn</span>
          </label>
        </div>

        {/* Bottom-Right Floating: Selected Landmark Detail Popup */}
        <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-[400] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 border border-slate-700 shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {selectedLandmark.category === 'dam' && '⚡'}
                {selectedLandmark.category === 'extreme' && '📍'}
                {selectedLandmark.category === 'lake' && '🌊'}
                {selectedLandmark.category === 'delta' && '🌾'}
                {selectedLandmark.category === 'city' && '🏛️'}
              </span>
              <h4 className="font-extrabold text-white text-sm">
                {selectedLandmark.name}
              </h4>
            </div>
            {selectedLandmark.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                {selectedLandmark.badge}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            {selectedLandmark.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-800/80 p-2 rounded-xl border border-slate-700">
            <div>
              <span className="text-slate-400 block">Tọa độ GPS:</span>
              <span className="font-mono font-bold text-slate-200">
                {selectedLandmark.position[0].toFixed(2)}°B, {selectedLandmark.position[1].toFixed(2)}°Đ
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Độ cao ước tính:</span>
              <span className="font-extrabold text-teal-400">
                {selectedLandmark.elevationM !== undefined ? `${selectedLandmark.elevationM} m` : 'Đang cập nhật'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
