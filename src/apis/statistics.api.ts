import axiosInstance from './axiosInstance.api';

export const fetchCalendarData = async (params: {
  year: number;
  month: string;
}) => {
  try {
    const response = await axiosInstance.get('/statistics/my/calendar', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('캘린더 데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchDailyData = async (params: {
  year: number;
  month: string;
  day: string;
}) => {
  try {
    const response = await axiosInstance.get('/statistics/my/daily', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('일간 통계 데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchWeeklyData = async (offset = 1) => {
  try {
    const response = await axiosInstance.get('/statistics/my/weekly', {
      params: { offset },
    });
    return response.data;
  } catch (error) {
    console.error('주간 통계 데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchMonthlyData = async (offset = 0) => {
  try {
    const response = await axiosInstance.get('/statistics/my/monthly', {
      params: { offset },
    });
    return response.data;
  } catch (error) {
    console.error('월간 통계 데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchAllAverage = async () => {
  try {
    const response = await axiosInstance.get('/statistics/all/average');
    return response.data;
  } catch (error) {
    console.error('전체 평균 데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchAllGraph = async (offset = 0) => {
  try {
    const response = await axiosInstance.get('/statistics/all/graph', {
      params: { offset },
    });
    return response.data;
  } catch (error) {
    console.error(
      '전체 통계 그래프 데이터를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
};
