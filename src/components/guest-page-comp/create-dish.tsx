

export function CreateDish(){

    return<>
    <input type="text" placeholder="Dish name" />
    <input type="text" placeholder="Description" />
    <input type="number"/>
    <table className="regTable">
            <thead className="regThead">
                <tr><th className="regTh">Allergens</th></tr>
            </thead>
            <tbody className="regTbody">
                <tr><td className="regTd"><input type="checkbox" name="Milk" value="MILK"/><label htmlFor="Milk">Milk</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Egg" value="EGG"/><label htmlFor="Egg">Egg</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Fish" value="FISH"/><label htmlFor="Fish">Fish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Shellfish" value="SHELLFISH"/><label htmlFor="Shellfish">Shellfish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Soy" value="SOY"/><label htmlFor="Soy">Soy</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Wheat" value="WHEAT"/><label htmlFor="Wheat">Wheat</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Treenut" value="TREENUT"/><label htmlFor="Treenut">Treenut</label></td></tr>
            </tbody>
    </table>
    </>
}