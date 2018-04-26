({
    doInit : function(component, event, helper) 
    {
        var action = component.get("c.getOpportunityJSON"); 
        action.setCallback(this, function(response) { 
            var state = response.getState(); 
            //alert(state);
            if (state === "SUCCESS") { 
                var dataObj= response.getReturnValue(); 
                //jsonData = dataObj;
                console.log('===='+dataObj);
                component.set("v.data",dataObj);
                helper.piechart(component,event,helper);
                helper.Linechart(component,event,helper);
                helper.donutchart(component,event,helper);
            } 
        });
        $A.enqueueAction(action);
    },
    piechart : function(component,event,helper) {
        var jsonData = component.get("v.data");
        var dataObj = JSON.parse(jsonData);
        
        new Highcharts.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                renderTo: component.find("chart").getElement(),
                type: 'pie'
            },
            title: {
                text: component.get("v.chartTitle")+' (Pie Chart)'
            },
            subtitle: {
                text: component.get("v.chartSubTitle")
            },
            xAxis: {
                categories: component.get("v.xAxisCategories"),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: 
                {
                    text: component.get("v.yAxisParameter")
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} ',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name:'StageName',
                data:dataObj
            }]
            
        });
        
    },
    
    Linechart : function(component,event,helper) {
        var jsonData = component.get("v.data");
        var dataObj = JSON.parse(jsonData);
        
        new Highcharts.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                renderTo: component.find("linechart").getElement(),
                type: 'line'
            },
            title: {
                text: component.get("v.chartTitle")+' (Line Chart)'
            },
            subtitle: {
                text: component.get("v.chartSubTitle")
            },
            xAxis: {
                categories: component.get("v.xAxisCategories"),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: 
                {
                    text: component.get("v.yAxisParameter")
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name:'StageName',
                data:dataObj
            }]
            
        });
        
    },
    donutchart : function(component,event,helper) {
        var jsonData = component.get("v.data");
        var dataObj = JSON.parse(jsonData);
        
        new Highcharts.Chart({
            chart: {
                renderTo: component.find("donutchart").getElement(),
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: component.get("v.chartTitle")+' (Donut Chart)'
            },
            subtitle: {
                text: component.get("v.chartSubTitle")
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                type: 'pie',
                name:'StageName',
                data:dataObj
            }]
            
        });
        
    }
})
