import { ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';



type DataItem = {
  title: string;
  url: string;
}
/**
 * Interface Carousel Props
 */
interface CarouselProps {
  data: DataItem[] | any;
  customRenderItem?: ListRenderItem<DataItem> | any;
}

/**
 * Carousel Component renders a horizontal scrolling list of items with pagination.
 * @param {CarouselProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Carousel = ({ data, customRenderItem }: CarouselProps) => {
  /**
   * Hooks
   */
  const scrollX = useSharedValue(0);
  const currentIndexShared = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
   console.log(currentIndex);
   
  }, [currentIndex])
  

  /**
   * Scroll handler to update scroll position and current index.
   */
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
          const index = Math.round(event.contentOffset.x / event.layoutMeasurement.width);
      if (index !== currentIndexShared.value) {
        currentIndexShared.value = index;
        runOnJS(setCurrentIndex)(index);
      }
  });

  return (
    <>
    <Animated.FlatList
      data={data}
      horizontal
      pagingEnabled
      contentContainerStyle={{ columnGap:40}} 
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      renderItem={({item, index}) => customRenderItem({item, index, scrollX}) } />
    </>
  )
}

/**
 * Export
 */
export default Carousel