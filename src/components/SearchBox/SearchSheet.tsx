import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import SearchBox from "./SearchBox"

const SearchSheet = () => {
    return (
        <div>
            <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Search size={16} />
                Search rooms
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-2xl pb-10">
              <div className="pt-4">
                <SearchBox />
              </div>
            </SheetContent>
          </Sheet>
        </div>
    )
}

export default SearchSheet;