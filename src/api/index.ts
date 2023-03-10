/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

export async function fetchCorrections(value: string) {
  const url = 'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy';

  const { data } = await axios.get(url, {
    params: {
      color_blindness: 0,
      q: value,
    },
  });

  return data;
}
