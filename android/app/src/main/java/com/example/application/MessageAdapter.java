package com.example.application;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.List;

public class MessageAdapter extends ArrayAdapter<Message> {
    public MessageAdapter(@NonNull Context context, int resource, @NonNull List objects) {
        super(context, resource, objects);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        Message msg = getItem(position);

        if(TextUtils.equals(msg.getIdUser(),ChatActivity.user.getId())) {
            convertView = ((Activity) getContext()).getLayoutInflater().inflate(R.layout.mon_message, parent, false);
            TextView messageTexte = convertView.findViewById(R.id.message_body);
            messageTexte.setText(msg.getTexte());
        }
        else {
            convertView = ((Activity) getContext()).getLayoutInflater().inflate(R.layout.autre_message, parent, false);

            TextView texteMessage = convertView.findViewById(R.id.message_body);
            TextView textePseudo = (TextView) convertView.findViewById(R.id.name);

            texteMessage.setVisibility(View.VISIBLE);
            textePseudo.setVisibility(View.VISIBLE);

            texteMessage.setText(msg.getPrenom());
            textePseudo.setText(msg.getPrenom());
        }


        return convertView;
    }
}
