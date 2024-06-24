const User = require('../models/user');
const Board = require('../models/board');
const { get } = require('mongoose');
const List = require('../models/list');
const Card = require('../models/card');
const boardController = {
    getAllList : async (req,res) =>{
        try{
            const lists = await List.find();
            return res.status(200).json(lists);
        } catch(err){
            return res.status(500).json(err);
        }
    }
    ,
    getListById : async (req,res) =>{
        try{
            const listId = req.params.id;
            const list = await List.findById(listId);
            if(!list){
                return res.status(404).json({message: 'List not found'});
            }
            return res.status(200).json(list);
        }catch(err){
            return res.status(500).json(err.message);
        }
    },
    createList : async (req,res) =>{
        try{
            const list = new List(req.body);
            await list.save();
            res.status(201).json({success: true, data: {list}});
        }catch(err){
            res.status(400).json({success: false, error: err.message});
        }
    },
    updateList : async (req,res) =>{
        try{
            const listId = req.params.id;
            const list = await List.findByIdAndUpdate(listId, req.body, {new: true});
        }catch(err){
            return res.status(500).json(err);
        }
    },
    getAllcardIds : async (req,res) =>{
        try{
            const list = await List.findById(req.params.id);
            if(!list) return res.status(404).json({success: false, message: 'List not found'});
            res.json({success: true, data: {cardIds: list.cardIds}});
        }catch(err){
            res.status(400).json({success: false, error: err.message});
        }
    },
    addCard : async (req,res) =>{
        try{
            const list = await List.findById(req.params.id);
            if(!list) return res.status(404).json({success: false, message: 'List not found'});
            list.cardIds.push(req.body.cardId);
            await list.save();
            res.json({success: true, data: {list}});
        }catch(err){
            res.status(400).json({success: false, error: err.message});
        }
    },
    deleteCard : async (req,res) =>{
        try{
            const list = await List.findById(req.params.id);
            if(!list) return res.status(404).json({success: false, message: 'List not found'});
            list.cardIds = list.cardIds.filter(cardId => cardId !== req.body.cardId);
            await list.save();
            res.json({success: true, data: {list}});
        }catch(err){
            res.status(400).json({success: false, error: err.message});
        }
    },
    
    getBoard : async(req,res) =>{
        try{
            const board = await Board.findById(req.params.id);
            if(!board) return res.status(404).json({success: false, message: 'Board not found'});
            res.json({success: true, data: {board}});
        }catch(err){
            res.status(400).json({success: false, error: err.message});
        }
    },


}
module.exports = boardController;