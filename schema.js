const{GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLBoolean,GraphQLList,GraphQLSchema}=require('graphql');
const axios=require('axios');

// launch type
const LaunchType=new GraphQLObjectType({
    name:'Launch',
    fields:()=>({
        flightNumber:{type:GraphQLInt},
        missionName:{type:GraphQLString},
        launchYear:{type:GraphQLString},
        launchDateLocal:{type:GraphQLString},
        launchSuccess:{type:GraphQLBoolean},
        rocket:{type:RocketType}
    })
});

// rocket type
const RocketType=new GraphQLObjectType({
    name:'Rocket',
    fields:()=>({
        rocketId:{type:GraphQLString},
        rocketName:{type:GraphQLString},
        rocketType:{type:GraphQLString}
    })
});

// root query
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        launches:{
            type:GraphQLList(LaunchType),
            resolve(parent,args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res=>res.data);
            }
        }
    })
});

module.exports=new GraphQLSchema({
    query:RootQuery
});