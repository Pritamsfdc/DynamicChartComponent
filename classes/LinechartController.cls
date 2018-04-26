public class LinechartController {
@AuraEnabled
    public static String getOpportunityJSON(){
        
       List<opportunity> lstopp = [SELECT Id, stagename FROM opportunity ];
        Map<String,Integer> mapLeadSource = new Map<String,Integer>();
        
        for(opportunity l : lstopp)
        {
            if(mapLeadSource.containsKey(l.stagename))
            {
                mapLeadSource.put(l.stagename, mapLeadSource.get(l.stagename)+1) ;
            }else{
                mapLeadSource.put(l.stagename, 0) ;        
            }
        }
        system.debug('map values--'+mapLeadSource);
        list<RadarDataWrapper> radarData = new list<RadarDataWrapper>();
        
        for(String key : mapLeadSource.keySet())
        {            
           RadarDataWrapper rdw = new RadarDataWrapper();
            rdw.name=key;
            rdw.y=mapLeadSource.get(key);
            radarData.add(rdw);
        }
        system.debug('rdw---'+radarData);
        return System.json.serialize(radarData);
        //return null;
    }
    
    /**
     * Wrapper class to serialize as JSON as return Value
     * */
    class RadarDataWrapper
    {
       @AuraEnabled
       public String name;
       @AuraEnabled
       public integer y;
      
    }

}
