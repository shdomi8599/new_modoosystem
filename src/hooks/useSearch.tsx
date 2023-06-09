import { searchState } from "@/recoil/recoil";
import { useRecoilState } from "recoil";

const useSearch = () => {
  const [search, setSearch] = useRecoilState(searchState);

  const resetSearch = () => {
    setSearch({ category: "", searchVal: "" });
  };

  return { search, setSearch, resetSearch };
};

export default useSearch;
